import { Button } from "@hwagfu/frameui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@hwagfu/frameui/drawer"

export default function DrawerDemo() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="secondary" />}>Chọn tập</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Squid Game · Mùa 2</DrawerTitle>
            <DrawerDescription>Vuốt xuống để đóng.</DrawerDescription>
          </DrawerHeader>
          <div className="grid grid-cols-4 gap-2 p-6">
            {Array.from({ length: 8 }, (_, i) => (
              <Button key={i} variant={i === 2 ? "golden" : "secondary"} size="sm">
                Tập {i + 1}
              </Button>
            ))}
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="ghost" />}>Đóng</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
