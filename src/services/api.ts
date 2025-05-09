import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { AxiosError } from 'axios';
import { HTTP_STATUS, handleError } from '@/constants/errors';

// Interface cho response API
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Interface cho request params
interface RequestParams {
  [key: string]: string | number | boolean | undefined;
}

// Interface cho request data
interface RequestData {
  [key: string]: unknown;
}

// Interface cho error response data
interface ErrorResponseData {
  message?: string;
  errors?: Record<string, string[]>;
}

// Extend InternalAxiosRequestConfig để thêm _retry
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Cấu hình mặc định
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Biến để lưu trạng thái refresh token
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Hàm để thêm subscriber vào hàng đợi
const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// Hàm để thông báo cho tất cả subscribers khi token mới được refresh
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const ApiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
ApiService.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
ApiService.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponseData>) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest?._retry) {
      if (isRefreshing) {
        // Nếu đang refresh token, thêm request vào hàng đợi
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(ApiService(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token sẽ tự động gửi trong cookie
        const response = await ApiService.post('/auth/refresh');
        const { accessToken } = response.data;

        // Cập nhật access token mới
        useAuthStore.getState().setAccessToken(accessToken);

        // Thông báo cho các request đang đợi
        isRefreshing = false;
        onRefreshed(accessToken);

        // Thử lại request ban đầu
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return ApiService(originalRequest);
      } catch (error) {
        // Refresh token hết hạn, logout
        isRefreshing = false;
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// API service class
class ApiServiceClass {
  // GET request
  static async get<T>(url: string, params?: RequestParams): Promise<ApiResponse<T>> {
    try {
      const response = await ApiService.get(url, { params });
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ErrorResponseData>);
    }
  }

  // POST request
  static async post<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    try {
      const response = await ApiService.post(url, data);
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ErrorResponseData>);
    }
  }

  // PUT request
  static async put<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    try {
      const response = await ApiService.put(url, data);
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ErrorResponseData>);
    }
  }

  // PATCH request
  static async patch<T>(url: string, data?: RequestData): Promise<ApiResponse<T>> {
    try {
      const response = await ApiService.patch(url, data);
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ErrorResponseData>);
    }
  }

  // DELETE request
  static async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await ApiService.delete(url);
      return response.data;
    } catch (error) {
      throw handleError(error as AxiosError<ErrorResponseData>);
    }
  }
}

export default ApiServiceClass;
