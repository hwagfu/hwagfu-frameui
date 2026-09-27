import { Bubble, BubbleContent } from "@hwagfu/frameui/bubble"

export default function BubbleDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Bubble>
        <BubbleContent>default — màu tím chính</BubbleContent>
      </Bubble>
      <Bubble variant="golden" align="end">
        <BubbleContent>golden — lời nhắn VIP</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>secondary — bề mặt lồng</BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>tinted — ánh tím nhạt</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent render={<button type="button" />}>outline — bấm được</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>destructive — gửi thất bại</BubbleContent>
      </Bubble>
    </div>
  )
}
