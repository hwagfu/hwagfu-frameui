// Writes the `exports` map of package.json from the built files:
//   "."              → dist/index.js (barrel)
//   "./<component>"  → dist/components/<component>.js
//   "./utils", "./hooks/*", "./styles.css", "./theme.css"
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs"
import { join, relative } from "node:path"

// 1. Every source file that starts with "use client" must still start with it
//    in dist — otherwise a Server Component importing it would break.
const DIRECTIVE = /^\s*["']use client["']/
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)]
  )
const lost = walk("src")
  .filter((f) => /\.tsx?$/.test(f) && DIRECTIVE.test(readFileSync(f, "utf8")))
  .map((f) => join("dist", relative("src", f)).replace(/\.tsx?$/, ".js"))
  .filter((out) => !existsSync(out) || !DIRECTIVE.test(readFileSync(out, "utf8")))
if (lost.length) {
  console.error(`postbuild: "use client" was lost in:\n  ${lost.join("\n  ")}`)
  process.exit(1)
}

// 2. Package exports.

const pkg = JSON.parse(readFileSync("package.json", "utf8"))
const entry = (base) => ({ types: `./dist/${base}.d.ts`, default: `./dist/${base}.js` })

const exports = { ".": entry("index") }
const components = readdirSync("dist/components")
  .filter((f) => f.endsWith(".js") && !f.startsWith("_"))
  .map((f) => f.slice(0, -3))
  .sort()
for (const name of components) exports[`./${name}`] = entry(`components/${name}`)
exports["./utils"] = entry("lib/utils")
exports["./icons"] = entry("lib/icons")
if (existsSync("dist/hooks")) {
  for (const f of readdirSync("dist/hooks").filter((f) => f.endsWith(".js")).sort()) {
    exports[`./hooks/${f.slice(0, -3)}`] = entry(`hooks/${f.slice(0, -3)}`)
  }
}
exports["./styles.css"] = "./dist/styles.css"
exports["./theme.css"] = "./dist/theme.css"
exports["./package.json"] = "./package.json"

pkg.exports = exports
pkg.types = "./dist/index.d.ts"
writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n")
console.log(`exports: ${components.length} components`)
