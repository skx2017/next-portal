import { ApiResponse } from "./types";
import { API_BASE_URL } from "./config";

// SSR/SSG GET
export async function serverGet<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(data.message || "请求失败");
  }
  return data;
}

// SSR/SSG POST
export async function serverPost<T>(url: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  const res = await fetch(fullUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      ...(options?.headers || {}),
      "Content-Type": "application/json",
    },
    cache: "no-store",
    ...options,
  });
  const data = await res.json();
  // if (data.code !== 0) {
  //   throw new Error(data.message || "请求失败");
  // }
  return data;
} 