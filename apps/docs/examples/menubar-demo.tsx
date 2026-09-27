import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@hwagfu/frameui/menubar"

export default function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Phát</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Phát / Tạm dừng <MenubarShortcut>Space</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Tua tới 10s <MenubarShortcut>→</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Tốc độ</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>0.75×</MenubarItem>
              <MenubarItem>1×</MenubarItem>
              <MenubarItem>1.5×</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Âm thanh</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup defaultValue="vi">
            <MenubarRadioItem value="vi">Thuyết minh</MenubarRadioItem>
            <MenubarRadioItem value="orig">Âm gốc</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarCheckboxItem defaultChecked>Tăng cường lời thoại</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Phụ đề</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem defaultChecked>Tiếng Việt</MenubarCheckboxItem>
          <MenubarCheckboxItem>English</MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
