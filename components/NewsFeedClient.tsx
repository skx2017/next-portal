"use client";
import { useEffect, useState, useRef } from "react";
import { clientPost } from "@/lib/request/clientFetch";

function getParams(tab: "推荐" | "订阅" | "政策", pageNum = 1, pageSize = 7) {
  let articleType = "weixin_article";
  if (tab === "订阅") articleType = "all";
  if (tab === "政策") articleType = "policy";
  return {
    articleType,
    pageNum,
    pageSize,
    operate: "",
    notInIds: [],
  };
}

interface NewsFeedClientProps {
  tab: "推荐" | "订阅" | "政策";
  initialData: any[];
}

export default function NewsFeedClient({ tab, initialData }: NewsFeedClientProps) {
  const [data, setData] = useState(initialData);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 切换Tab时，主动请求第一页
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setPageNum(1);
    setHasMore(true);
    setLoading(true);
    // 切换tab时滚动到顶部
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    const params = getParams(tab, 1, 7);
    clientPost("/api/creative-portal/v1/resources/topList", params)
      .then(res => {
        const list = Array.isArray(res.rows) ? res.rows : [];
        setData(list);
        setHasMore(list.length > 0); // 只要有数据就允许继续加载
      })
      .finally(() => setLoading(false));
  }, [tab]);

  // 加载更多
  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const params = getParams(tab, pageNum + 1, 7);
    console.log('loadMore params', params);
    const res = await clientPost("/api/creative-portal/v1/resources/topList", params);
    const list = Array.isArray(res.rows) ? res.rows : [];
    setData(prev => [...prev, ...list]);
    setPageNum(prev => prev + 1);
    setHasMore(list.length > 0); // 只要有数据就允许继续加载
    setLoading(false);
  };

  // 监听滚动到底部
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const diff = el.scrollHeight - el.scrollTop - el.clientHeight;
      console.log(
        'scrolling', el.scrollTop, el.scrollHeight, el.clientHeight,
        'hasMore', hasMore, 'loading', loading, 'diff', diff
      );
      if (diff < 50 && hasMore && !loading) {
        console.log('触发加载更多');
        loadMore();
      }
    };
    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [data, hasMore, loading, tab, pageNum]);

  return (
    <div ref={containerRef} className="h-full min-h-0 overflow-y-auto space-y-4">
      {data.map((item: any, idx: number) => (
        <div key={item.id || idx} className="flex gap-4 bg-[#f8f9ff] rounded-xl p-4 shadow-sm">
          <div>{item.title}</div>
        </div>
      ))}
      {loading && <div className="text-center">AI智能推荐中</div>}
      {!hasMore && <div className="text-center text-gray-400">登录后查看更多数据</div>}
    </div>
  );
} 