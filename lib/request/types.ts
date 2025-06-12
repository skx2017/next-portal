export interface ApiResponse<T = any> {
  rows: any;
  code: number;           // 0: 成功，非0: 失败
  message: string;        // 错误信息
  data: T;                // 业务数据
} 