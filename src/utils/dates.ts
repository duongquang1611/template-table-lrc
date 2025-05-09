import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Cấu hình dayjs
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('vi');

// Các định dạng date phổ biến
export const DATE_FORMATS = {
  FULL_DATE: 'DD/MM/YYYY',
  FULL_DATE_TIME: 'DD/MM/YYYY HH:mm',
  FULL_DATE_TIME_SECONDS: 'DD/MM/YYYY HH:mm:ss',
  TIME: 'HH:mm',
  TIME_SECONDS: 'HH:mm:ss',
  ISO: 'YYYY-MM-DD',
  ISO_TIME: 'YYYY-MM-DD HH:mm:ss',
  MONTH_YEAR: 'MM/YYYY',
  YEAR: 'YYYY',
} as const;

/**
 * Format date theo định dạng
 * @param date - Date cần format
 * @param format - Định dạng (mặc định: DD/MM/YYYY)
 * @returns string
 */
export const formatDate = (
  date: string | Date | number,
  format = DATE_FORMATS.FULL_DATE
): string => {
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
 * Lấy ngày đầu tiên của tháng
 * @param date - Date cần lấy
 * @returns Date
 */
export const getFirstDayOfMonth = (date: string | Date | number): Date => {
  return dayjs(date).startOf('month').toDate();
};

/**
 * Lấy ngày cuối cùng của tháng
 * @param date - Date cần lấy
 * @returns Date
 */
export const getLastDayOfMonth = (date: string | Date | number): Date => {
  return dayjs(date).endOf('month').toDate();
};

/**
 * Kiểm tra xem date có phải là ngày hôm nay không
 * @param date - Date cần kiểm tra
 * @returns boolean
 */
export const isToday = (date: string | Date | number): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

/**
 * Kiểm tra xem date có phải là ngày trong quá khứ không
 * @param date - Date cần kiểm tra
 * @returns boolean
 */
export const isPast = (date: string | Date | number): boolean => {
  return dayjs(date).isBefore(dayjs(), 'day');
};

/**
 * Kiểm tra xem date có phải là ngày trong tương lai không
 * @param date - Date cần kiểm tra
 * @returns boolean
 */
export const isFuture = (date: string | Date | number): boolean => {
  return dayjs(date).isAfter(dayjs(), 'day');
};

/**
 * Thêm số ngày vào date
 * @param date - Date cần thêm
 * @param amount - Số ngày cần thêm
 * @returns Date
 */
export const addDays = (date: string | Date | number, amount: number): Date => {
  return dayjs(date).add(amount, 'day').toDate();
};

/**
 * Thêm số tháng vào date
 * @param date - Date cần thêm
 * @param amount - Số tháng cần thêm
 * @returns Date
 */
export const addMonths = (date: string | Date | number, amount: number): Date => {
  return dayjs(date).add(amount, 'month').toDate();
};

/**
 * Thêm số năm vào date
 * @param date - Date cần thêm
 * @param amount - Số năm cần thêm
 * @returns Date
 */
export const addYears = (date: string | Date | number, amount: number): Date => {
  return dayjs(date).add(amount, 'year').toDate();
};
