import { Badge } from "@hwagfu/frameui/badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@hwagfu/frameui/table"

const invoices = [
  { id: "HD-0012", plan: "VIP năm", status: "Đã thanh toán", amount: "790.000đ" },
  { id: "HD-0011", plan: "VIP tháng", status: "Đã thanh toán", amount: "79.000đ" },
  { id: "HD-0010", plan: "VIP tháng", status: "Hoàn tiền", amount: "79.000đ" },
]

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>Lịch sử thanh toán gần đây.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Mã hoá đơn</TableHead>
          <TableHead>Gói</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Số tiền</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium text-heading">{invoice.id}</TableCell>
            <TableCell>{invoice.plan}</TableCell>
            <TableCell>
              <Badge variant={invoice.status === "Hoàn tiền" ? "secondary" : "default"}>{invoice.status}</Badge>
            </TableCell>
            <TableCell className="text-right tabular-nums">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Tổng</TableCell>
          <TableCell className="text-right tabular-nums">948.000đ</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
