"use client";
import { ApiResponse } from "./types";
import { API_BASE_URL } from "./config";

// 通用 GET
export async function clientGet<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  const res = await fetch(fullUrl, {
    ...options,
    credentials: "include",
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
      // 可加token等
    },
  });
  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(data.message || "请求失败");
  }
  return data;
}

// 通用 POST
export async function clientPost<T>(url: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  const res = await fetch(fullUrl, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
    },
    ...options,
  });
  const data = await res.json();
  // if (data.code !== 0) {
  //   throw new Error(data.message || "请求失败");
  // }
  return data;
}

// SWR fetcher
export const swrFetcher = (url: string) => clientGet(url).then(res => res.data); 