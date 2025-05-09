import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale tiếng Việt
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import numeral from 'numeral';

// Cấu hình dayjs
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.locale('vi'); // Sử dụng locale tiếng Việt

// Các định dạng tiền tệ phổ biến
export const CURRENCY_FORMATS = {
  VND: '0,0 ₫',
  USD: '$0,0',
  EUR: '€0,0',
  JPY: '¥0,0',
} as const;

/**
 * Format date theo định dạng
 * @param date - Date cần format
 * @param format - Định dạng (mặc định: DD/MM/YYYY)
 * @returns string
 */
export const formatDate = (date: string | Date | number, format = 'DD/MM/YYYY'): string => {
  if (!date) return '';
  return dayjs(date).format(format);
};

/**
 * Format date thành thời gian tương đối (ví dụ: 2 giờ trước)
 * @param date - Date cần format
 * @returns string
 */
export const formatRelativeTime = (date: string | Date | number): string => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

/**
 * Format số tiền theo định dạng tiền tệ
 * @param amount - Số tiền cần format
 * @param format - Định dạng (mặc định: VND)
 * @returns string
 */
export const formatMoney = (amount: number | string, format = CURRENCY_FORMATS.VND): string => {
  if (!amount) return '0';
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return numeral(num).format(format);
};

/**
 * Format số theo định dạng có dấu phẩy ngăn cách
 * @param number - Số cần format
 * @returns string
 */
export const formatNumber = (number: number | string): string => {
  if (!number) return '0';
  const num = typeof number === 'string' ? parseFloat(number) : number;
  return numeral(num).format('0,0');
};

/**
 * Format số điện thoại theo định dạng Việt Nam
 * @param phone - Số điện thoại cần format
 * @returns string
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  // Xóa tất cả ký tự không phải số
  const cleaned = phone.replace(/\D/g, '');
  // Format: 0XXX XXX XXX
  const match = cleaned.match(/^0?(\d{3})(\d{3})(\d{3})$/);
  if (match) {
    return `0${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};

/**
 * Format tên file (ví dụ: ảnh.jpg -> ảnh-20240315.jpg)
 * @param fileName - Tên file cần format
 * @returns string
 */
export const formatFileName = (fileName: string): string => {
  if (!fileName) return '';
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) return `${fileName}-${date}`;
  const name = fileName.substring(0, lastDotIndex);
  const ext = fileName.substring(lastDotIndex);
  return `${name}-${date}${ext}`;
};
