// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MAX_QUESTION_LENGTH, POST } from "./route";

function chatRequest(body: unknown): Request {
	return new Request("http://localhost:3000/api/chat", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: typeof body === "string" ? body : JSON.stringify(body),
	});
}

function groqOk(content: string): Response {
	return new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
		status: 200,
		headers: { "Content-Type": "application/json" },
	});
}

const TEST_KEY = "test-key-not-a-real-credential";

describe("POST /api/chat", () => {
	beforeEach(() => {
		vi.stubEnv("GROQ_API_KEY", TEST_KEY);
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.unstubAllEnvs();
		vi.restoreAllMocks();
	});

	it("rejects a malformed body with 400", async () => {
		const response = await POST(chatRequest("not json"));
		expect(response.status).toBe(400);
		await expect(response.json()).resolves.toHaveProperty("error");
	});

	it("rejects an empty question with 400", async () => {
		const response = await POST(chatRequest({ question: "   ", locale: "en" }));
		expect(response.status).toBe(400);
	});

	it("rejects an over-long question with 400", async () => {
		const response = await POST(
			chatRequest({
				question: "a".repeat(MAX_QUESTION_LENGTH + 1),
				locale: "en",
			}),
		);
		expect(response.status).toBe(400);
	});

	it("rejects an unsupported locale with 400", async () => {
		const response = await POST(chatRequest({ question: "Hi", locale: "fr" }));
		expect(response.status).toBe(400);
	});

	it("returns 500 when the API key is not configured", async () => {
		vi.stubEnv("GROQ_API_KEY", "");
		const fetchSpy = vi.spyOn(globalThis, "fetch");

		const response = await POST(chatRequest({ question: "Hi", locale: "en" }));

		expect(response.status).toBe(500);
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it("calls Groq with the system prompt and the trimmed question", async () => {
		const fetchSpy = vi
			.spyOn(globalThis, "fetch")
			.mockResolvedValue(groqOk("  I own the backend architecture.  "));

		const response = await POST(
			chatRequest({ question: "  What do you do?  ", locale: "pt" }),
		);

		expect(response.status).toBe(200);
		await expect(response.json()).resolves.toEqual({
			answer: "I own the backend architecture.",
		});

		const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
		expect(url).toBe("https://api.groq.com/openai/v1/chat/completions");
		expect(init.method).toBe("POST");
		expect((init.headers as Record<string, string>).Authorization).toBe(
			`Bearer ${TEST_KEY}`,
		);

		const sent = JSON.parse(init.body as string);
		expect(sent.model).toBe("openai/gpt-oss-20b");
		expect(sent.stream).toBe(false);
		expect(sent.messages[0].role).toBe("system");
		expect(sent.messages[0].content).toContain(
			"always answer in Brazilian Portuguese",
		);
		expect(sent.messages[1]).toEqual({
			role: "user",
			content: "What do you do?",
		});
	});

	it("maps a Groq rate limit to 503 without leaking the key or upstream body", async () => {
		vi.spyOn(globalThis, "fetch").mockResolvedValue(
			new Response(`{"error":"quota exceeded for ${TEST_KEY}"}`, {
				status: 429,
			}),
		);

		const response = await POST(chatRequest({ question: "Hi", locale: "en" }));

		expect(response.status).toBe(503);
		const text = await response.text();
		expect(text).not.toContain(TEST_KEY);
		expect(text).not.toContain("quota exceeded");
	});

	it("maps any other Groq failure to 502", async () => {
		vi.spyOn(globalThis, "fetch").mockResolvedValue(
			new Response("{}", { status: 401 }),
		);

		const response = await POST(chatRequest({ question: "Hi", locale: "en" }));
		expect(response.status).toBe(502);
	});

	it("maps a network failure to 503", async () => {
		vi.spyOn(globalThis, "fetch").mockRejectedValue(
			new Error(`connect ECONNREFUSED using ${TEST_KEY}`),
		);

		const response = await POST(chatRequest({ question: "Hi", locale: "en" }));

		expect(response.status).toBe(503);
		expect(await response.text()).not.toContain(TEST_KEY);
	});

	it("returns 502 when Groq answers with an empty completion", async () => {
		vi.spyOn(globalThis, "fetch").mockResolvedValue(groqOk("   "));

		const response = await POST(chatRequest({ question: "Hi", locale: "en" }));
		expect(response.status).toBe(502);
	});
});
