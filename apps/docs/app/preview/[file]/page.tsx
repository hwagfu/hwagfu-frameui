import { notFound } from "next/navigation"

import { examples } from "@/examples"
import { docs } from "@/lib/registry"

/** Full-page examples (Sidebar…) rendered alone, for the docs iframes. */
export function generateStaticParams() {
  return docs.flatMap((doc) => doc.examples.filter((e) => e.iframe).map((e) => ({ file: e.file })))
}

export default async function PreviewPage({ params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const Example = examples[file]
  if (!Example) notFound()
  return <Example />
}
