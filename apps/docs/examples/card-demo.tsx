import { Badge } from "@hwagfu/frameui/badge"
import { Button } from "@hwagfu/frameui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@hwagfu/frameui/card"

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Tiếp tục xem</CardTitle>
        <CardDescription>Hành tinh cát: Phần hai · còn 48 phút</CardDescription>
        <CardAction>
          <Badge variant="golden">VIP</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="h-1 overflow-hidden rounded-full bg-heading/15">
          <div className="h-full w-2/3 bg-brand" />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="ghost" size="sm">
          Bỏ qua
        </Button>
        <Button variant="golden" size="sm">
          Xem tiếp
        </Button>
      </CardFooter>
    </Card>
  )
}
