import { Tabs, TabsContent, TabsList, TabsTrigger } from "@hwagfu/frameui/tabs"

export default function TabsSegmented() {
  return (
    <Tabs defaultValue="month" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="month">Theo tháng</TabsTrigger>
        <TabsTrigger value="year">Theo năm</TabsTrigger>
      </TabsList>
      <TabsContent value="month" className="text-muted-foreground">79.000đ mỗi tháng.</TabsContent>
      <TabsContent value="year" className="text-muted-foreground">790.000đ mỗi năm — tiết kiệm 2 tháng.</TabsContent>
    </Tabs>
  )
}
