import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@hwagfu/frameui/select"

const qualities = [
  { value: "auto", label: "Tự động" },
  { value: "2160", label: "4K · 2160p" },
  { value: "1080", label: "Full HD · 1080p" },
  { value: "720", label: "HD · 720p" },
  { value: "480", label: "480p" },
]

export default function SelectDemo() {
  return (
    <Select items={qualities} defaultValue="1080">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Chất lượng" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Chất lượng video</SelectLabel>
          {qualities.slice(0, 1).map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          {qualities.slice(1).map((item) => (
            <SelectItem key={item.value} value={item.value} disabled={item.value === "2160"}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
