import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "es2022",
  sourcemap: true,
  dts: true,
  clean: true,
  splitting: false,
  outDir: "dist",
});
