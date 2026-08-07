import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, writeFile, readFile, rm, copyFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = path.join(__dirname, "templates", "resume.typ");

export async function generateResumePdf(resumeData: unknown): Promise<Buffer> {
  const workDir = await mkdtemp(path.join(tmpdir(), "resume-"));
  const typstFile = path.join(workDir, "resume.typ");
  const dataFile = path.join(workDir, "data.json");
  const outputFile = path.join(workDir, "cv.pdf");

  try {
    await copyFile(TEMPLATE_PATH, typstFile);
    await writeFile(dataFile, JSON.stringify(resumeData, null, 2), "utf-8");

    await execFileAsync("typst", ["compile", typstFile, outputFile], { timeout: 15_000 });

    return await readFile(outputFile);
  } catch (error: any) {
    const stderr = error?.stderr?.toString?.() ?? error.message;
    throw new Error(`Falha na compilação do Typst: ${stderr}`);
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}
