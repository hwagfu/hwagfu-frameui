import { FileText, Film, X } from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@hwagfu/frameui/attachment"
import { Spinner } from "@hwagfu/frameui/spinner"

export default function AttachmentDemo() {
  return (
    <AttachmentGroup className="w-full max-w-xl">
      <Attachment>
        <AttachmentMedia>
          <FileText />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>phu-de-vi.srt</AttachmentTitle>
          <AttachmentDescription>42 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Gỡ">
            <X />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>trailer-4k.mp4</AttachmentTitle>
          <AttachmentDescription>Đang tải lên · 64%</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <Film />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>poster.psd</AttachmentTitle>
          <AttachmentDescription>Định dạng không hỗ trợ</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </AttachmentGroup>
  )
}
