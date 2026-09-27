import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["src/**/*.{ts,tsx}"],
  // One output file per source file: keeps each component's "use client"
  // boundary exactly where it was written and lets bundlers tree-shake.
  unbundle: true,
  root: "src",
  platform: "neutral",
  format: "esm",
  target: "es2022",
  dts: true,
  sourcemap: false,
  clean: true,
  copy: [{ from: "src/styles/*.css", to: "dist" }],
  // Rolldown warns that "use client" *may* be lost when modules are merged.
  // In unbundle mode nothing is merged, so every directive survives —
  // scripts/postbuild.mjs verifies that and fails the build otherwise.
  checks: { moduleLevelDirective: false },
})
