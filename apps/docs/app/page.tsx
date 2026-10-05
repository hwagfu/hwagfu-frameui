import Link from "next/link"
import { ArrowRight, Crown, Play, Search } from "lucide-react"

import { Badge } from "@hwagfu/frameui/badge"
import { Button } from "@hwagfu/frameui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@hwagfu/frameui/card"
import { Checkbox } from "@hwagfu/frameui/checkbox"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@hwagfu/frameui/input-group"
import { Label } from "@hwagfu/frameui/label"
import { LogoMark } from "@hwagfu/frameui/logo"
import { Progress } from "@hwagfu/frameui/progress"
import { Switch } from "@hwagfu/frameui/switch"
import { Tabs, TabsList, TabsTrigger } from "@hwagfu/frameui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@hwagfu/frameui/toggle-group"

import { SiteHeader } from "@/components/site-header"
import { docs } from "@/lib/registry"

export default function Home() {
  const serverCount = docs.filter((d) => d.runtime === "server").length

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1200px] flex-col gap-16 px-4 pt-16 pb-24 lg:px-8">
        <section className="flex flex-col items-center gap-6 text-center">
          <LogoMark size={56} label="" />
          <Badge variant="outline" className="rounded-full px-3">
            shadcn/ui · Base UI · Tailwind CSS v4 · React 19
          </Badge>
          <h1 className="m-0 max-w-3xl text-[44px] leading-[52px] font-extrabold tracking-tight text-balance text-heading">
            Toàn bộ shadcn/ui, <span className="text-golden">mặc áo FrameON</span>.
          </h1>
          <p className="m-0 max-w-2xl text-link text-muted-foreground">
            {docs.length} component với đúng API của shadcn, giữ nguyên giao diện FrameON, và {serverCount} trong số đó không
            gửi một byte JavaScript nào xuống trình duyệt.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="golden" size="lg" className="rounded-full" nativeButton={false} render={<Link href="/docs/installation" />}>
              Bắt đầu <ArrowRight data-icon="inline-end" />
            </Button>
            <Button variant="secondary" size="lg" className="rounded-full" nativeButton={false} render={<Link href="/docs/components" />}>
              Xem {docs.length} component
            </Button>
          </div>
        </section>

        <section aria-label="Minh hoạ" className="grid gap-5 md:grid-cols-3">
          <Card variant="promo">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="size-5" /> Gói VIP
              </CardTitle>
              <CardDescription>Không quảng cáo · 4K HDR · 4 thiết bị</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="text-h1 text-heading">
                79.000đ<span className="text-subtitle font-normal text-muted-foreground"> / tháng</span>
              </div>
              <Button variant="golden" className="rounded-full">
                Nâng cấp ngay
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tiếp tục xem</CardTitle>
              <CardDescription>Squid Game · Mùa 2 · Tập 6</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Progress value={62} aria-label="Đã xem" />
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="golden">VIP</Badge>
                <Badge>Song ngữ</Badge>
                <Badge variant="secondary">FHD</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="golden" size="sm">
                  <Play data-icon="inline-start" /> Xem tiếp
                </Button>
                <Button variant="outline" size="sm">
                  Chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardContent className="flex flex-col gap-5">
              <InputGroup className="h-[46px] rounded-full">
                <InputGroupInput type="search" placeholder="Tìm phim, diễn viên…" aria-label="Tìm kiếm" />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
              <ToggleGroup variant="outline" size="sm" multiple defaultValue={["action"]}>
                <ToggleGroupItem value="action">Hành động</ToggleGroupItem>
                <ToggleGroupItem value="drama">Chính kịch</ToggleGroupItem>
                <ToggleGroupItem value="anime">Hoạt hình</ToggleGroupItem>
              </ToggleGroup>
              <div className="flex items-center justify-between">
                <Label htmlFor="home-auto">Tự động phát</Label>
                <Switch id="home-auto" defaultChecked />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="home-sub" defaultChecked />
                <Label htmlFor="home-sub">Hiện phụ đề</Label>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="flex min-w-0 justify-center">
          <Tabs defaultValue="web" className="w-full min-w-0 items-center">
            <TabsList variant="line" className="justify-start sm:justify-center">
              <TabsTrigger value="web">@hwagfu/frameui · Web</TabsTrigger>
              <TabsTrigger value="native" disabled>
                @hwagfu/frameui-native · sắp ra mắt
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </section>
      </main>
    </>
  )
}
