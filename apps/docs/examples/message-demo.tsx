import { Avatar, AvatarFallback } from "@hwagfu/frameui/avatar"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@hwagfu/frameui/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@hwagfu/frameui/message"

export default function MessageDemo() {
  return (
    <MessageGroup className="w-full max-w-md">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>An · 21:04</MessageHeader>
          <BubbleGroup>
            <Bubble variant="secondary">
              <BubbleContent>Tối nay xem Squid Game 2 không?</BubbleContent>
            </Bubble>
            <Bubble variant="secondary">
              <BubbleContent>Mình đang ở tập 6 rồi 😆</BubbleContent>
              <BubbleReactions>🔥 2</BubbleReactions>
            </Bubble>
          </BubbleGroup>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble align="end">
            <BubbleContent>Ok! Mở phòng xem chung nhé</BubbleContent>
          </Bubble>
          <MessageFooter>Đã xem</MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  )
}
