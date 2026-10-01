/**
 * The shadcn registry side of the docs: FrameUI's components can also be
 * copied into a project with `shadcn add @frameui/<name>` (see
 * scripts/gen-registry.mjs). These helpers turn the npm-package snippets of
 * a component page into their registry equivalent.
 */

export const NAMESPACE = "@frameui"

export const shadcnAdd = (...items: string[]) =>
  `pnpm dlx shadcn@latest add ${items.map((item) => `${NAMESPACE}/${item}`).join(" ")}`

/** Import lines for a project that installed the files with the shadcn CLI. */
export function shadcnImports(imports: string) {
  return imports
    .replace(/"@hwagfu\/frameui\/utils"/g, '"@/lib/utils"')
    .replace(/"@hwagfu\/frameui\/icons"/g, '"@/lib/frameui/icons"')
    .replace(/"@hwagfu\/frameui\/hooks\/([\w-]+)"/g, '"@/hooks/$1"')
    .replace(/"@hwagfu\/frameui\/([\w-]+)"/g, '"@/components/ui/$1"')
}

/** `components.json` entry that points the CLI at this site's registry. */
export function registriesConfig(origin: string) {
  const config = {
    registries: {
      [NAMESPACE]: {
        url: `${origin}/r/{name}.json`,
        headers: { Authorization: "Bearer ${FRAMEUI_TOKEN}" },
      },
    },
  }
  return JSON.stringify(config, null, 2)
}
