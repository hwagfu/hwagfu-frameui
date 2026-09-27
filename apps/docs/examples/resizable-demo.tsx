import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@hwagfu/frameui/resizable"

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="min-h-52 max-w-lg rounded-md border border-border">
      <ResizablePanel defaultSize="40%">
        <div className="flex h-full items-center justify-center p-6 text-subtitle">Danh sách phát</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="60%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="65%">
            <div className="flex h-full items-center justify-center p-6 text-subtitle">Trình phát</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="35%">
            <div className="flex h-full items-center justify-center p-6 text-subtitle">Bình luận</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
