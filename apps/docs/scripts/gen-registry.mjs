// Builds the source of the shadcn registry from the library itself
// (packages/frameui/src), so the npm package and the registry never drift:
//
//   registry.json              items, dependencies and the FrameON theme
//   registry/frameui/ui/…      components
//   registry/frameui/lib/…     cn() and the FrameON helpers (render, styles, icons)
//   registry/frameui/hooks/…   hooks
//   registry/frameui/examples/… the docs examples, for `shadcn view` and the
//                              shadcn MCP server ("show me a button example")
//
// Files are copied as they are, except relative imports, which become
// `@/registry/frameui/…` — the shadcn CLI maps those onto the aliases of the
// project that installs them. `shadcn build` then turns registry.json into
// public/r/<item>.json, served at /r/<item>.json (proxy.ts guards it).
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, posix } from "node:path"
import postcss from "postcss"

const LIB = "../../packages/frameui"
const SRC = join(LIB, "src")
const OUT = "registry/frameui"
const NAMESPACE = "@frameui"

const pkg = JSON.parse(readFileSync(join(LIB, "package.json"), "utf8"))

// --- Modules -------------------------------------------------------------
// A module is a source file named by its path under src/, without extension:
// "components/button", "lib/utils", "hooks/use-mobile".

const files = new Map() // module → file name under src/
for (const dir of ["components", "lib", "hooks"]) {
  for (const f of readdirSync(join(SRC, dir)).sort()) {
    if (/\.tsx?$/.test(f)) files.set(`${dir}/${f.replace(/\.tsx?$/, "")}`, `${dir}/${f}`)
  }
}

/** Registry item that ships a module; `null` = private, bundled into every item that imports it. */
function ownerOf(mod) {
  const [dir, name] = mod.split("/")
  if (dir === "components") return name.startsWith("_") ? null : name
  if (dir === "hooks") return name
  const lib = { utils: "utils", render: "render", styles: "styles", icons: "icons", "create-icon": null }
  if (name in lib) return lib[name]
  throw new Error(`gen-registry: no registry item owns src/${files.get(mod)} — add it to ownerOf()`)
}

/**
 * Where a module lives in the registry, which is also where it lands in the
 * user's project: ui/ → components/ui, lib/ → lib, hooks/ → hooks. FrameON's
 * helpers get their own lib/frameui/ folder so they never clash with the
 * project's files; cn() replaces lib/utils.ts, as shadcn's own does.
 */
function registryPath(mod) {
  const [dir, name] = mod.split("/")
  if (dir === "components") return `ui/${name}`
  if (dir === "hooks") return `hooks/${name}`
  return name === "utils" ? "lib/utils" : `lib/frameui/${name}`
}

const fileType = (mod) =>
  mod.startsWith("components/") ? "registry:ui" : mod.startsWith("hooks/") ? "registry:hook" : "registry:lib"

const IMPORT = /(\b(?:from|import)\s*)(["'])([^"']+)\2/g
const source = (mod) => readFileSync(join(SRC, files.get(mod)), "utf8")
const resolve = (mod, spec) => posix.normalize(posix.join(posix.dirname(mod), spec))

/** npm package of a bare import: "@base-ui/react/dialog" → "@base-ui/react". */
function packageOf(spec) {
  const parts = spec.split("/")
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

const PEERS = new Set(["react", "react-dom"])
function dependency(name) {
  const range = pkg.dependencies?.[name]
  if (!range) throw new Error(`gen-registry: "${name}" is imported but not a dependency of ${pkg.name}`)
  return `${name}@${range}`
}

// --- Titles and descriptions, from the docs' component registry -----------

const meta = new Map()
const exampleMeta = new Map() // example file → { title, description }
const STRING = String.raw`("(?:[^"\\]|\\.)*")`
for (const f of readdirSync("lib/registry").filter((f) => f.endsWith(".ts"))) {
  const code = readFileSync(join("lib/registry", f), "utf8")
  const entry = new RegExp(String.raw`slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",[\s\S]*?description:\s*` + STRING, "g")
  for (const [, slug, name, description] of code.matchAll(entry)) {
    meta.set(slug, { title: name, description: JSON.parse(description) })
  }
  // Each component's chunk of the file, up to the next `slug:`, holds its examples.
  for (const chunk of code.split(/(?=slug:\s*")/).slice(1)) {
    const component = meta.get(chunk.match(/^slug:\s*"([^"]+)"/)[1])
    const example = new RegExp(String.raw`\{\s*file:\s*"([^"]+)",\s*title:\s*` + STRING + String.raw`(?:,\s*description:\s*` + STRING + ")?", "g")
    for (const [, file, title, description] of chunk.matchAll(example)) {
      exampleMeta.set(file, {
        title: `${component.title}: ${JSON.parse(title)}`,
        description: description ? JSON.parse(description) : component.description,
      })
    }
  }
}

const HELPERS = {
  utils: {
    title: "cn()",
    description:
      "cn() của FrameON: clsx + tailwind-merge đã biết thang chữ, bóng và animation của FrameON. Thay lib/utils.ts, cùng chữ ký với cn() của shadcn.",
  },
  render: {
    title: "renderElement()",
    description: "Bản không dùng hook của useRender (Base UI): giữ prop render mà component vẫn là Server Component.",
  },
  styles: {
    title: "Class dùng chung",
    description: "Chuỗi class lặp lại của FrameON: viền focus vàng, bề mặt ô nhập, hiệu ứng pop, dòng menu.",
  },
  icons: {
    title: "Icon nội bộ",
    description: "Icon Lucide dạng SVG thuần, không \"use client\", nên render tĩnh trong Server Component.",
  },
  "use-mobile": { title: "useIsMobile()", description: "Hook theo dõi màn hình dưới 768px." },
}

// --- Component, lib and hook items ----------------------------------------

/** Every module an item ships, its npm dependencies and the other items it needs. */
function collect(name, entry) {
  const mods = []
  const dependencies = new Set()
  const registryDependencies = new Set()
  const queue = [entry]
  while (queue.length) {
    const mod = queue.shift()
    if (mods.includes(mod)) continue
    mods.push(mod)
    for (const [, , , spec] of source(mod).matchAll(IMPORT)) {
      if (!spec.startsWith(".")) {
        if (!PEERS.has(packageOf(spec))) dependencies.add(dependency(packageOf(spec)))
        continue
      }
      const target = resolve(mod, spec)
      if (!files.has(target)) throw new Error(`gen-registry: src/${files.get(mod)} imports missing "${spec}"`)
      const owner = ownerOf(target)
      if (owner === null || owner === name) queue.push(target)
      else registryDependencies.add(`${NAMESPACE}/${owner}`)
    }
  }
  return { mods, dependencies: [...dependencies].sort(), registryDependencies: [...registryDependencies].sort() }
}

rmSync("registry", { recursive: true, force: true })

const written = new Set()
function writeModule(mod) {
  if (written.has(mod)) return
  written.add(mod)
  const code = source(mod).replace(IMPORT, (match, keyword, quote, spec) =>
    spec.startsWith(".") ? `${keyword}${quote}@/registry/frameui/${registryPath(resolve(mod, spec))}${quote}` : match
  )
  const out = join(OUT, `${registryPath(mod)}${files.get(mod).match(/\.tsx?$/)[0]}`)
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, code)
}

const entries = [...files.keys()].filter((mod) => ownerOf(mod) !== null)
const order = (mod) => (mod.startsWith("components/") ? 1 : 0) // helpers first, then components
entries.sort((a, b) => order(a) - order(b) || a.localeCompare(b))

const items = entries.map((entry) => {
  const name = ownerOf(entry)
  const { mods, dependencies, registryDependencies } = collect(name, entry)
  mods.forEach(writeModule)
  const info = meta.get(name) ?? HELPERS[name]
  if (!info) throw new Error(`gen-registry: no title for "${name}" — add it to the docs registry or HELPERS`)
  return {
    name,
    type: fileType(entry),
    ...info,
    ...(dependencies.length ? { dependencies } : {}),
    ...(registryDependencies.length ? { registryDependencies } : {}),
    files: mods.map((mod) => ({
      path: join(OUT, `${registryPath(mod)}${files.get(mod).match(/\.tsx?$/)[0]}`),
      type: fileType(mod),
    })),
  }
})

// --- Examples --------------------------------------------------------------
// The live examples of the docs. The shadcn MCP server finds them by name
// ("button-demo") and shows their code to an assistant asking how a component
// is used, so their imports are the ones a project actually writes
// (`@/components/ui/button`) rather than registry paths. The CLI still maps
// them onto the project's aliases when an example is added.

const docsPkg = JSON.parse(readFileSync("package.json", "utf8"))
const EXAMPLE_PEERS = new Set([...PEERS, "next"])
const exampleDependency = (name) => {
  const range = docsPkg.dependencies?.[name] ?? pkg.dependencies?.[name]
  if (!range) throw new Error(`gen-registry: an example imports "${name}", which the docs do not depend on`)
  return `${name}@${range}`
}

/** "@hwagfu/frameui/button" → the module it names, as in `files`. */
function libraryModule(spec) {
  const sub = spec.slice("@hwagfu/frameui/".length)
  if (sub === "utils") return "lib/utils"
  if (sub === "icons") return "lib/icons"
  return sub.startsWith("hooks/") ? sub : `components/${sub}`
}

const exampleItems = readdirSync("examples")
  .filter((f) => f.endsWith(".tsx"))
  .sort()
  .map((f) => {
    const name = f.slice(0, -4)
    const info = exampleMeta.get(name)
    if (!info) throw new Error(`gen-registry: examples/${f} is not listed in any component of lib/registry`)
    if (ownerOf(`components/${name}`) === name && files.has(`components/${name}`)) {
      throw new Error(`gen-registry: example "${name}" has the same name as a component`)
    }
    const dependencies = new Set()
    const registryDependencies = new Set()
    const code = readFileSync(join("examples", f), "utf8").replace(IMPORT, (match, keyword, quote, spec) => {
      if (spec.startsWith("@hwagfu/frameui/")) {
        const mod = libraryModule(spec)
        if (!files.has(mod)) throw new Error(`gen-registry: examples/${f} imports unknown "${spec}"`)
        registryDependencies.add(`${NAMESPACE}/${ownerOf(mod)}`)
        return `${keyword}${quote}@/${registryPath(mod).replace(/^ui\//, "components/ui/")}${quote}`
      }
      if (spec.startsWith(".")) throw new Error(`gen-registry: examples/${f} has a relative import "${spec}"`)
      if (!EXAMPLE_PEERS.has(packageOf(spec))) dependencies.add(exampleDependency(packageOf(spec)))
      return match
    })
    const path = join(OUT, "examples", f)
    mkdirSync(dirname(path), { recursive: true })
    writeFileSync(path, code)
    return {
      name,
      type: "registry:example",
      ...info,
      ...(dependencies.size ? { dependencies: [...dependencies].sort() } : {}),
      registryDependencies: [...registryDependencies].sort(),
      files: [{ path, type: "registry:example" }],
    }
  })

// --- Theme: styles.css (+ theme.css) as cssVars and css -------------------
//
// The CLI merges these into the project's Tailwind CSS file: palette into
// :root (and .dark — FrameON is dark only, so a `dark` class changes nothing),
// tokens into @theme inline, the rest (variants, utilities, keyframes, base
// layer) as rules. `@source` is dropped: the components now live in the
// project, which Tailwind already scans.

const cssVars = { theme: {}, light: {}, dark: {} }
const css = {}
const clean = (value) => value.replace(/\s+/g, " ").trim()
const varName = (prop) => prop.replace(/^--/, "")

/** postcss node → the nested-object form of a registry item's `css`. */
function toObject(container) {
  const out = {}
  container.each((node) => {
    if (node.type === "decl") out[node.prop] = clean(node.value)
    else if (node.type === "rule") out[node.selectors.join(", ")] = toObject(node)
    else if (node.type === "atrule") {
      out[`@${node.name}${node.params ? ` ${clean(node.params)}` : ""}`] = node.nodes ? toObject(node) : {}
    }
  })
  return out
}

function readCss(file) {
  postcss.parse(readFileSync(file, "utf8")).each((node) => {
    if (node.type === "comment") return
    if (node.type === "atrule" && node.name === "import") {
      const target = node.params.slice(1, -1)
      if (target.startsWith(".")) readCss(join(dirname(file), target))
      else css[`@import ${node.params}`] = {}
    } else if (node.type === "atrule" && node.name === "source") {
      // Components are part of the project now; nothing extra to scan.
    } else if (node.type === "rule" && node.selector === ":root") {
      node.each((decl) => {
        if (decl.type !== "decl") return
        cssVars.light[varName(decl.prop)] = clean(decl.value)
        cssVars.dark[varName(decl.prop)] = clean(decl.value)
      })
    } else if (node.type === "atrule" && node.name === "theme") {
      node.each((child) => {
        if (child.type === "decl") cssVars.theme[varName(child.prop)] = clean(child.value)
        else if (child.type === "atrule" && child.name === "keyframes") css[`@keyframes ${child.params}`] = toObject(child)
      })
    } else if (node.type === "atrule") {
      css[`@${node.name} ${clean(node.params)}`] = toObject(node)
    } else {
      throw new Error(`gen-registry: unexpected top-level CSS in ${file}: ${node.toString().slice(0, 60)}`)
    }
  })
}
readCss(join(SRC, "styles/styles.css"))

const theme = {
  name: "theme",
  type: "registry:theme",
  title: "FrameON theme",
  description:
    "Token màu, thang chữ, bo góc, bóng, animation và style nền của FrameON, ghi vào file CSS của Tailwind. Cài một lần, trước mọi component.",
  dependencies: [dependency("tw-animate-css")],
  registryDependencies: [`${NAMESPACE}/utils`],
  cssVars,
  css,
  docs: "FrameON dùng font Be Vietnam Pro qua biến --font-be-vietnam (ví dụ next/font/google với variable: \"--font-be-vietnam\").",
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "frameui",
  homepage: "https://github.com/hwagfu/hwagfu-frameui",
  items: [theme, ...items, ...exampleItems],
}
writeFileSync("registry.json", JSON.stringify(registry, null, 2) + "\n")
console.log(`registry: ${registry.items.length} items (${exampleItems.length} examples), ${written.size + exampleItems.length} files`)
