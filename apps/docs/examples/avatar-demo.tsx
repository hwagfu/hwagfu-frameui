import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@hwagfu/frameui/avatar"

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="Minh" />
        <AvatarFallback>MN</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <Avatar>
        <AvatarFallback>HP</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>TL</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/80?img=5" alt="An" />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/80?img=32" alt="Bình" />
          <AvatarFallback>BI</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/80?img=47" alt="Chi" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+8</AvatarGroupCount>
      </AvatarGroup>
    </div>
  )
}
