import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/services/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
});
