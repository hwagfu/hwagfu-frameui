"use client"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@hwagfu/frameui/combobox"

const genres = ["Hành động", "Chính kịch", "Hài", "Kinh dị", "Lãng mạn", "Khoa học viễn tưởng", "Hoạt hình"]

export default function ComboboxMultiple() {
  const anchor = useComboboxAnchor()

  return (
    <Combobox items={genres} multiple defaultValue={["Hành động", "Hài"]}>
      <ComboboxChips ref={anchor} className="w-full max-w-md">
        <ComboboxValue>
          {(values: string[]) => (
            <>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Thêm thể loại…" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>Không có thể loại phù hợp.</ComboboxEmpty>
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
