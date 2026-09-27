"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@hwagfu/frameui/combobox"

const countries = ["Việt Nam", "Hàn Quốc", "Nhật Bản", "Trung Quốc", "Thái Lan", "Mỹ", "Anh", "Pháp"]

export default function ComboboxDemo() {
  return (
    <Combobox items={countries}>
      <ComboboxInput placeholder="Chọn quốc gia" className="w-64" showClear />
      <ComboboxContent>
        <ComboboxEmpty>Không tìm thấy quốc gia.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
