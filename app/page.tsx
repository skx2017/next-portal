"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import NewsFeedServer from "@/components/NewsFeedServer";

const NewsFeedClient = dynamic(() => import("@/components/NewsFeedClient"), { ssr: false });

// 假数据
const newsData = {
  推荐: [],
  订阅: [],
  政策: [],
};

export default function Home() {
  const [tab, setTab] = useState<"推荐" | "订阅" | "政策">("推荐");
  const [initialData, setInitialData] = useState<any[]>(newsData[tab]); // 先用假数据，后续可用接口

  // Tab 切换时，initialData 只在首次加载时用，后续由 NewsFeedClient 自己请求

  return (
    <div className="min-h-screen  flex flex-col">
      <div className="flex-1 flex items-center justify-center overflow-x-hidden">
        <div className="w-[80vw] max-w-[1920px] mx-auto h-[90vh] flex flex-col lg:flex-row gap-4 overflow-x-hidden">
          {/* 主内容区 */}
          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow p-8 h-full min-h-0">
            {/* 顶部搜索栏 */}
            <h1 className="text-2xl font-bold text-center mb-6 mt-2 text-[#181c32]">请问需要什么帮助?</h1>
            <div className="w-full flex justify-center mb-8">
              <input
                type="text"
                placeholder="请输入进行全文检索"
                className="w-[480px] rounded-full px-6 py-2 border border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-[#f6f7fb]"
              />
              <button className="ml-2 px-6 py-2 rounded-full bg-[#7c83f5] text-white font-semibold">搜索</button>
            </div>
            {/* Tab */}
            <div className="flex border-b border-[#e5e7eb] mb-4">
              {["推荐", "订阅", "政策"].map((t) => (
                <button
                  key={t}
                  className={`px-6 py-2 font-semibold ${
                    tab === t
                      ? "text-[#7c83f5] border-b-2 border-[#7c83f5] bg-white rounded-t-lg"
                      : "text-gray-500"
                  }`}
                  onClick={() => setTab(t as "推荐" | "订阅" | "政策")}
                >
                  {t}
                </button>
              ))}
            </div>
            {/* 新闻流混合渲染 */}
            <div className="flex-1 min-h-0">
              <NewsFeedClient tab={tab} initialData={initialData} />
            </div>
            {/* 页脚 */}
            <div className="text-center text-xs text-gray-400 mt-8">
              用户协议 | 隐私政策 | 关于我们 | 公网安备 浙ICP备2021039909号-1 | 版权所有 ©2023 深佳科技 zjsjkj.cn
            </div>
          </div>
          {/* 右侧卡片区 */}
          <div className="w-full lg:w-[340px] flex flex-col gap-6 h-full min-w-0">
            {/* 登录卡片（建议CSR） */}
            <Suspense fallback={<div className="bg-white rounded-2xl shadow p-6">加载中...</div>}>
              {/* 这里可以用一个 LoginCard 组件，建议用 'use client' */}
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <span className="text-3xl text-gray-400">👤</span>
                </div>
                <div className="font-semibold mb-2">立即登录</div>
                <div className="text-xs text-gray-400 mb-4">定制科研兴趣圈&回答学术影响力</div>
                <button className="px-4 py-1 rounded bg-[#7c83f5] text-white text-sm mb-4">添加关注</button>
                <div className="flex justify-between w-full text-xs text-gray-500">
                  <div className="flex flex-col items-center flex-1">
                    <span>关注领域</span>
                    <span className="font-bold text-[#181c32]">--</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span>关注公众号</span>
                    <span className="font-bold text-[#181c32]">--</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span>知友数</span>
                    <span className="font-bold text-[#181c32]">--</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <span>标签数</span>
                    <span className="font-bold text-[#181c32]">--</span>
                  </div>
                </div>
              </div>
            </Suspense>
            {/* 设备卡片 */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center mb-2">
                <span className="text-5xl text-gray-200">📦</span>
              </div>
              <div className="text-gray-400 mt-2">暂无绑定的硬件设备</div>
            </div>
            {/* 数据统计卡片（建议SSR） */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="font-semibold mb-4">数据统计</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center bg-[#f8f9ff] rounded-lg p-2">
                  <span className="text-[#7c83f5] text-xl font-bold flex items-center gap-1">
                    <span className="material-icons text-base">folder</span>260
                  </span>
                  <span className="text-xs text-gray-500">领域标签数</span>
                </div>
                <div className="flex flex-col items-center bg-[#f8f9ff] rounded-lg p-2">
                  <span className="text-[#7c83f5] text-xl font-bold flex items-center gap-1">
                    <span className="material-icons text-base">folder</span>20854
                  </span>
                  <span className="text-xs text-gray-500">公域知识数量</span>
                </div>
                <div className="flex flex-col items-center bg-[#f8f9ff] rounded-lg p-2">
                  <span className="text-[#7c83f5] text-xl font-bold flex items-center gap-1">
                    <span className="material-icons text-base">folder</span>121
                  </span>
                  <span className="text-xs text-gray-500">自媒体数量</span>
                </div>
                <div className="flex flex-col items-center bg-[#f8f9ff] rounded-lg p-2">
                  <span className="text-[#7c83f5] text-xl font-bold flex items-center gap-1">
                    <span className="material-icons text-base">folder</span>9
                  </span>
                  <span className="text-xs text-gray-500">创作应用数量</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}