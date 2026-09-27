import { Crown } from "lucide-react"

import { Button } from "@hwagfu/frameui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@hwagfu/frameui/card"

export default function CardVariants() {
  return (
    <div className="grid w-full gap-5 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>default</CardTitle>
          <CardDescription>Thẻ nội dung tiêu chuẩn.</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>elevated</CardTitle>
          <CardDescription>Bề mặt lồng, nhiều khoảng thở hơn.</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="promo">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="size-5" /> promo
          </CardTitle>
          <CardDescription>Khối mời nâng cấp VIP.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="golden" size="sm" className="rounded-full">
            Nâng cấp
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
