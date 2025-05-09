import { z } from 'zod';
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
  NAME_PATTERN,
  ID_CARD_PATTERN,
  DATE_PATTERN,
} from './regex';

// Schema cho email
export const emailSchema = z
  .string()
  .min(1, 'Email là bắt buộc')
  .regex(EMAIL_PATTERN, 'Email không hợp lệ')
  .max(255, 'Email không được vượt quá 255 ký tự');

// Schema cho mật khẩu
export const passwordSchema = z
  .string()
  .min(1, 'Mật khẩu là bắt buộc')
  .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
  .max(50, 'Mật khẩu không được vượt quá 50 ký tự')
  .regex(
    PASSWORD_PATTERN,
    'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
  );

// Schema cho số điện thoại
export const phoneSchema = z
  .string()
  .min(1, 'Số điện thoại là bắt buộc')
  .regex(PHONE_PATTERN, 'Số điện thoại không hợp lệ');

// Schema cho tên
export const nameSchema = z
  .string()
  .min(1, 'Tên là bắt buộc')
  .min(2, 'Tên phải có ít nhất 2 ký tự')
  .max(50, 'Tên không được vượt quá 50 ký tự')
  .regex(NAME_PATTERN, 'Tên chỉ được chứa chữ cái và khoảng trắng');

// Schema cho địa chỉ
export const addressSchema = z
  .string()
  .min(1, 'Địa chỉ là bắt buộc')
  .min(5, 'Địa chỉ phải có ít nhất 5 ký tự')
  .max(255, 'Địa chỉ không được vượt quá 255 ký tự');

// Schema cho số CMND/CCCD
export const idCardSchema = z
  .string()
  .min(1, 'CMND/CCCD là bắt buộc')
  .regex(ID_CARD_PATTERN, 'CMND/CCCD không hợp lệ');

// Schema cho ngày tháng
export const dateSchema = z
  .string()
  .min(1, 'Ngày tháng là bắt buộc')
  .regex(DATE_PATTERN, 'Định dạng ngày tháng không hợp lệ (YYYY-MM-DD)');

// Schema cho số tiền
export const moneySchema = z
  .number()
  .min(0, 'Số tiền không được âm')
  .max(1000000000000, 'Số tiền không được vượt quá 1 tỷ');

// Schema cho đăng ký tài khoản
export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
    fullName: nameSchema,
    phone: phoneSchema,
    address: addressSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

// Schema cho đăng nhập
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
});

// Schema cho cập nhật thông tin
export const updateProfileSchema = z.object({
  fullName: nameSchema,
  phone: phoneSchema,
  address: addressSchema,
  dateOfBirth: dateSchema,
  idCard: idCardSchema,
});

// Schema cho đổi mật khẩu
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mật khẩu hiện tại là bắt buộc'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Xác nhận mật khẩu là bắt buộc'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

// Schema cho quên mật khẩu
export const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

// Schema cho reset password
export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

// Types từ schemas
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
