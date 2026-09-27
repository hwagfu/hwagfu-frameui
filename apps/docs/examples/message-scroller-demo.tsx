"use client"

import * as React from "react"

import { Bubble, BubbleContent } from "@hwagfu/frameui/bubble"
import { Button } from "@hwagfu/frameui/button"
import { Message, MessageContent } from "@hwagfu/frameui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@hwagfu/frameui/message-scroller"

const seed = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  mine: i % 3 === 0,
  text: i % 3 === 0 ? `Mình thích cảnh số ${i + 1}!` : `Đoạn này hay thật, phút ${10 + i * 4}.`,
}))

export default function MessageScrollerDemo() {
  const [messages, setMessages] = React.useState(seed)

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <MessageScrollerProvider>
        <MessageScroller className="h-72 rounded-md border border-border bg-card">
          <MessageScrollerViewport className="p-4">
            <MessageScrollerContent>
              {messages.map((m) => (
                <MessageScrollerItem key={m.id}>
                  <Message align={m.mine ? "end" : "start"}>
                    <MessageContent>
                      <Bubble variant={m.mine ? "default" : "secondary"} align={m.mine ? "end" : "start"}>
                        <BubbleContent>{m.text}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              ))}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <Button
        variant="secondary"
        size="sm"
        className="self-start"
        onClick={() =>
          setMessages((list) => [...list, { id: list.length, mine: true, text: "Tin nhắn mới 👋" }])
        }
      >
        Gửi thêm tin
      </Button>
    </div>
  )
}
