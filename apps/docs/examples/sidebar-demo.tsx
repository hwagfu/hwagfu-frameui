import { Clapperboard, Crown, Film, Heart, History, Home, Settings, Tv } from "lucide-react"

import { Badge } from "@hwagfu/frameui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@hwagfu/frameui/sidebar"

const browse = [
  { title: "Trang chủ", icon: Home, active: true },
  { title: "Phim lẻ", icon: Clapperboard },
  { title: "Phim bộ", icon: Tv, badge: "12" },
]

export default function SidebarDemo() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="FrameON">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground">
                  <Film className="size-4!" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-bold text-heading">FrameON</span>
                  <span className="text-micro text-muted-foreground">Xem phim không giới hạn</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Khám phá</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {browse.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Của tôi</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Yêu thích">
                    <Heart />
                    <span>Yêu thích</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#" isActive>
                        <span>Phim hành động</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#">
                        <span>Anime cuối tuần</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Lịch sử xem">
                    <History />
                    <span>Lịch sử xem</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Nâng cấp VIP">
                <Crown className="text-brand" />
                <span>Nâng cấp VIP</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Cài đặt">
                <Settings />
                <span>Cài đặt</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-3 border-b border-border px-4">
          <SidebarTrigger />
          <span className="text-subtitle font-bold text-heading">Trang chủ</span>
          <Badge variant="golden" className="ml-auto">
            VIP
          </Badge>
        </header>
        <div className="grid flex-1 grid-cols-2 gap-4 p-4 sm:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="aspect-[2/3] rounded-md bg-card-nested" />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
