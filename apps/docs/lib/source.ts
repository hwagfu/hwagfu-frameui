import "server-only"

import { readFile } from "node:fs/promises"
import path from "node:path"

/** Source of an example file, read at build time so the shown code always matches the preview. */
export async function readExample(file: string) {
  const code = await readFile(path.join(process.cwd(), "examples", `${file}.tsx`), "utf8")
  return code.trimEnd()
}
