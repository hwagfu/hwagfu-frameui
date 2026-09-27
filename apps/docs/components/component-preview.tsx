import { Tabs, TabsContent, TabsList, TabsTrigger } from "@hwagfu/frameui/tabs"

import { examples } from "@/examples"
import { readExample } from "@/lib/source"
import type { ExampleDoc } from "@/lib/types"
import { CodeBlock } from "./code-block"
import { InlineMarkdown } from "./inline-markdown"

/**
 * Live example + its exact source. The example renders as whatever it is —
 * a Server Component stays static HTML, a client example hydrates.
 */
export async function ComponentPreview({ example }: { example: ExampleDoc }) {
  const Example = examples[example.file]
  const code = await readExample(example.file)
  const id = `example-${example.file}`

  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h3 id={id} className="m-0 text-link font-bold text-heading">
        {example.title}
      </h3>
      {example.description ? (
        <p className="mt-1 mb-0 text-subtitle text-muted-foreground">
          <InlineMarkdown text={example.description} />
        </p>
      ) : null}
      <Tabs defaultValue="preview" className="mt-4 gap-3">
        <TabsList variant="line">
          <TabsTrigger value="preview">Xem trước</TabsTrigger>
          <TabsTrigger value="code">Mã nguồn</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          {example.iframe ? (
            <iframe
              title={example.title}
              src={`/preview/${example.file}`}
              style={{ height: example.iframe }}
              className="w-full rounded-md border border-border bg-background"
            />
          ) : (
            <div className="relative flex min-h-56 items-center justify-center overflow-x-auto rounded-md border border-border bg-background bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:18px_18px] p-6 sm:p-10">
              {Example ? <Example /> : <p className="text-destructive">Thiếu ví dụ “{example.file}”.</p>}
            </div>
          )}
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock code={code} title={`examples/${example.file}.tsx`} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
