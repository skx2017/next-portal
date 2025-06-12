import { serverPost } from "@/lib/request/serverFetch";

interface NewsFeedServerProps {
  tab: "推荐" | "订阅" | "政策";
}

function getParams(tab: "推荐" | "订阅" | "政策", pageNum = 1, pageSize = 7, notInIds: string[] = []) {
  let articleType = "weixin_article";
  if (tab === "订阅") articleType = "all";
  if (tab === "政策") articleType = "policy";
  return {
    articleType,
    pageNum,
    pageSize,
    operate: "",
    notInIds: notInIds.length ? [notInIds.join(",")] : [],
  };
}

export default async function NewsFeedServer({ tab }: NewsFeedServerProps) {
  const params = getParams(tab, 1, 7, []);
  const res = await serverPost("/api/creative-portal/v1/resources/topList", params);
  console.log(res);
  const data = Array.isArray(res.rows) ? res.rows : [];

  return (
    <div className="space-y-4 flex-1 overflow-y-auto">
      {data.map((item: any) => (
        <div key={item.id} className="flex gap-4 bg-[#f8f9ff] rounded-xl p-4 shadow-sm">
          {/* ...渲染内容... */}
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
} 