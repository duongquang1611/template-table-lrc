import { AxiosError } from 'axios';

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  [HTTP_STATUS.UNAUTHORIZED]: {
    DEFAULT: 'Phiên đăng nhập hết hạn',
    INVALID_TOKEN: 'Token không hợp lệ',
    EXPIRED_TOKEN: 'Token đã hết hạn',
    INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng',
  },
  [HTTP_STATUS.FORBIDDEN]: {
    DEFAULT: 'Không có quyền truy cập',
  },
  [HTTP_STATUS.NOT_FOUND]: {
    DEFAULT: 'Không tìm thấy dữ liệu',
  },
  [HTTP_STATUS.BAD_REQUEST]: {
    DEFAULT: 'Dữ liệu không hợp lệ',
  },
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: {
    DEFAULT: 'Có lỗi xảy ra, vui lòng thử lại sau',
  },
} as const;

// Error Types
export const ERROR_TYPES = {
  AUTH: 'AUTH',
  VALIDATION: 'VALIDATION',
  NETWORK: 'NETWORK',
  SERVER: 'SERVER',
} as const;

// Error Response Data
interface ErrorResponseData {
  message?: string;
  errors?: Record<string, string[]>;
}

// Error Handler
export const handleError = (error: AxiosError<ErrorResponseData>) => {
  if (error.response) {
    const { status, data } = error.response;
    const errorMessage =
      ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES]?.DEFAULT ||
      data?.message ||
      'Có lỗi xảy ra';
    return {
      type: getErrorType(status),
      message: errorMessage,
      status,
      data: data?.errors,
    };
  }
  return {
    type: ERROR_TYPES.NETWORK,
    message: 'Không thể kết nối đến server',
    status: 0,
  };
};

// Helper function to get error type
const getErrorType = (status: number) => {
  switch (status) {
    case HTTP_STATUS.UNAUTHORIZED:
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_TYPES.AUTH;
    case HTTP_STATUS.BAD_REQUEST:
      return ERROR_TYPES.VALIDATION;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return ERROR_TYPES.SERVER;
    default:
      return ERROR_TYPES.NETWORK;
  }
};
