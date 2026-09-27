import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@hwagfu/frameui/navigation-menu"

const genres = ["Hành động", "Chính kịch", "Hài", "Kinh dị", "Lãng mạn", "Hoạt hình", "Tài liệu", "Âm nhạc"]
const countries = ["Việt Nam", "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Mỹ"]

export default function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" active>
            Trang chủ
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Thể loại</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="mb-2 text-micro tracking-[0.1px] text-tertiary uppercase">Thể loại</div>
            <ul className="m-0 grid w-[360px] list-none grid-cols-3 gap-x-4 gap-y-0.5 p-0">
              {genres.map((genre) => (
                <li key={genre}>
                  <NavigationMenuLink href="#">{genre}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Quốc gia</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="m-0 flex w-[180px] list-none flex-col p-0">
              {countries.map((country) => (
                <li key={country}>
                  <NavigationMenuLink href="#">{country}</NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Phim lẻ</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
