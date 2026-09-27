import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyInlineCode,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
} from "@hwagfu/frameui/typography"

export default function TypographyDemo() {
  return (
    <div className="max-w-prose">
      <TypographyH1>Chuyện kể của FrameON</TypographyH1>
      <TypographyLead className="mt-3">
        Mỗi tối thứ Sáu, cả nhà lại quây quần trước màn hình lớn.
      </TypographyLead>
      <TypographyH2 className="mt-8">Khởi đầu</TypographyH2>
      <TypographyP>
        Từ một kho phim nhỏ, FrameON dần có hàng nghìn bộ phim với phụ đề <TypographyInlineCode>vi</TypographyInlineCode>{" "}
        và thuyết minh.
      </TypographyP>
      <TypographyBlockquote>“Phim hay là phim khiến ta quên nhìn đồng hồ.”</TypographyBlockquote>
      <TypographyH3 className="mt-8">Gói thành viên</TypographyH3>
      <TypographyList>
        <li>Không quảng cáo</li>
        <li>Chất lượng 4K HDR</li>
        <li>Tải về xem ngoại tuyến</li>
      </TypographyList>
      <TypographyMuted>Cập nhật lần cuối: 26/09/2026</TypographyMuted>
    </div>
  )
}
