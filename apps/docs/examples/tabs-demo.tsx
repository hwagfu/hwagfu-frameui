import { Tabs, TabsContent, TabsList, TabsTrigger } from "@hwagfu/frameui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="episodes" className="w-full max-w-lg">
      <TabsList variant="line">
        <TabsTrigger value="episodes">Danh sách tập</TabsTrigger>
        <TabsTrigger value="cast">Diễn viên</TabsTrigger>
        <TabsTrigger value="reviews">Bình luận</TabsTrigger>
        <TabsTrigger value="related">Đề xuất</TabsTrigger>
      </TabsList>
      <TabsContent value="episodes" className="text-muted-foreground">24 tập · mỗi tập 45 phút.</TabsContent>
      <TabsContent value="cast" className="text-muted-foreground">Lee Jung-jae, Wi Ha-joon, Lee Byung-hun…</TabsContent>
      <TabsContent value="reviews" className="text-muted-foreground">1.204 bình luận.</TabsContent>
      <TabsContent value="related" className="text-muted-foreground">Alice in Borderland, Sweet Home…</TabsContent>
    </Tabs>
  )
}
