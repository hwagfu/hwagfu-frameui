"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@hwagfu/frameui/badge"
import { Button } from "@hwagfu/frameui/button"
import { Checkbox } from "@hwagfu/frameui/checkbox"
import { DataTable, DataTableColumnHeader, type DataTableFeatures } from "@hwagfu/frameui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@hwagfu/frameui/dropdown-menu"

type Film = { id: string; title: string; genre: string; year: number; views: number }

const films: Film[] = [
  { id: "1", title: "Hành tinh cát: Phần hai", genre: "Khoa học viễn tưởng", year: 2024, views: 182000 },
  { id: "2", title: "Ký sinh trùng", genre: "Chính kịch", year: 2019, views: 240500 },
  { id: "3", title: "Mắt biếc", genre: "Lãng mạn", year: 2019, views: 98000 },
  { id: "4", title: "Vùng đất câm lặng", genre: "Kinh dị", year: 2018, views: 76500 },
  { id: "5", title: "Vùng đất linh hồn", genre: "Hoạt hình", year: 2001, views: 310200 },
  { id: "6", title: "Bố già", genre: "Chính kịch", year: 1972, views: 150900 },
  { id: "7", title: "Hai Phượng", genre: "Hành động", year: 2019, views: 88700 },
  { id: "8", title: "Kẻ đánh cắp giấc mơ", genre: "Khoa học viễn tưởng", year: 2010, views: 205300 },
  { id: "9", title: "Tiệc trăng máu", genre: "Hài", year: 2020, views: 64100 },
  { id: "10", title: "Đất rừng phương Nam", genre: "Phiêu lưu", year: 2023, views: 57800 },
  { id: "11", title: "Chị chị em em", genre: "Chính kịch", year: 2019, views: 43200 },
]

const columnHelper = createColumnHelper<DataTableFeatures, Film>()

const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Chọn tất cả"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Chọn dòng"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tên phim" />,
    cell: ({ getValue }) => <span className="font-medium text-heading">{getValue()}</span>,
  }),
  columnHelper.accessor("genre", {
    header: "Thể loại",
    cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge>,
  }),
  columnHelper.accessor("year", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Năm" />,
  }),
  columnHelper.accessor("views", {
    header: ({ column }) => <DataTableColumnHeader column={column} title="Lượt xem" className="justify-end" />,
    cell: ({ getValue }) => (
      <div className="text-right tabular-nums">{getValue().toLocaleString("vi-VN")}</div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Mở menu" />}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
          <DropdownMenuItem>Thêm vào danh sách</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
])

export default function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={films}
      filterColumn="title"
      filterPlaceholder="Lọc theo tên phim…"
      pageSizeOptions={[5, 10, 20]}
      emptyMessage="Không có phim nào."
      className="w-full"
    />
  )
}
