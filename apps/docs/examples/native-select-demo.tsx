import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@hwagfu/frameui/native-select"

export default function NativeSelectDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <NativeSelect defaultValue="">
        <NativeSelectOption value="" disabled>
          Chọn thể loại
        </NativeSelectOption>
        <NativeSelectOptGroup label="Phổ biến">
          <NativeSelectOption value="action">Hành động</NativeSelectOption>
          <NativeSelectOption value="drama">Chính kịch</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Khác">
          <NativeSelectOption value="docs">Tài liệu</NativeSelectOption>
          <NativeSelectOption value="anime">Hoạt hình</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
      <NativeSelect size="sm" defaultValue="2026">
        <NativeSelectOption value="2026">2026</NativeSelectOption>
        <NativeSelectOption value="2025">2025</NativeSelectOption>
      </NativeSelect>
    </div>
  )
}
