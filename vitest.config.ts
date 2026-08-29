import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		environmentOptions: {
			jsdom: {
				url: "http://localhost:3000/",
			},
		},
		setupFiles: ["./vitest.setup.ts"],
		globals: true,
		pool: "forks",
		execArgv: ["--no-experimental-webstorage"],
	},
	resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
