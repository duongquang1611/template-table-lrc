/**
 * Các regex patterns thường dùng
 */

// Email pattern
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password pattern (ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt)
export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Số điện thoại Việt Nam (bắt đầu bằng 0, theo sau là 9 số)
export const PHONE_PATTERN = /^0[0-9]{9}$/;

// Tên (chỉ chữ cái và khoảng trắng, bao gồm dấu tiếng Việt)
export const NAME_PATTERN = /^[a-zA-ZÀ-ỹ\s]+$/;

// CMND/CCCD (9 hoặc 12 số)
export const ID_CARD_PATTERN = /^[0-9]{9}$|^[0-9]{12}$/;

// Ngày tháng (YYYY-MM-DD)
export const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// URL pattern
export const URL_PATTERN = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Username pattern (chữ cái, số, dấu gạch dưới, 3-20 ký tự)
export const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

// Chỉ số
export const NUMBER_PATTERN = /^[0-9]+$/;

// Chỉ chữ cái
export const LETTERS_PATTERN = /^[a-zA-Z]+$/;

// Chỉ chữ cái và số
export const ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

// Mã bưu điện Việt Nam (6 số)
export const POSTAL_CODE_PATTERN = /^[0-9]{6}$/;

// Mã số thuế (10 hoặc 13 số)
export const TAX_CODE_PATTERN = /^[0-9]{10}$|^[0-9]{13}$/;

// Mã số doanh nghiệp (10 số)
export const BUSINESS_CODE_PATTERN = /^[0-9]{10}$/;

// Mã số hộ chiếu (1 chữ cái + 7 số)
export const PASSPORT_PATTERN = /^[A-Z][0-9]{7}$/;

// Mã số thẻ ngân hàng (16-19 số)
export const BANK_CARD_PATTERN = /^[0-9]{16,19}$/;

// Mã số thẻ ATM (16 số)
export const ATM_CARD_PATTERN = /^[0-9]{16}$/;

// Mã số thẻ tín dụng (16 số)
export const CREDIT_CARD_PATTERN = /^[0-9]{16}$/;

// Mã số thẻ ghi nợ (16 số)
export const DEBIT_CARD_PATTERN = /^[0-9]{16}$/;

// Mã số thẻ cào (10 số)
export const SCRATCH_CARD_PATTERN = /^[0-9]{10}$/;

// Mã số thẻ cào điện thoại (12 số)
export const PHONE_CARD_PATTERN = /^[0-9]{12}$/;

// Mã số thẻ cào game (10 số)
export const GAME_CARD_PATTERN = /^[0-9]{10}$/;

// Mã số thẻ cào internet (12 số)
export const INTERNET_CARD_PATTERN = /^[0-9]{12}$/;

// Mã số thẻ cào truyền hình (12 số)
export const TV_CARD_PATTERN = /^[0-9]{12}$/;

// Mã số thẻ cào điện (12 số)
export const ELECTRICITY_CARD_PATTERN = /^[0-9]{12}$/;

// Mã số thẻ cào nước (12 số)
export const WATER_CARD_PATTERN = /^[0-9]{12}$/;

// Mã số thẻ cào gas (12 số)
export const GAS_CARD_PATTERN = /^[0-9]{12}$/;
