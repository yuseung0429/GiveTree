import { z } from 'zod';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,20}$/;

export const accountInfoSchema = z
  .object({
    email: z.string().email('유효한 이메일 주소를 입력해주세요.'),

    password: z
      .string()
      .min(6, '최소 6자리여야 합니다.')
      .max(20, '최대 20자리 이하이어야 합니다.')
      .regex(PASSWORD_REGEX, '문자와 숫자를 포함해야 합니다.'),

    confirm_password: z.string(),

    profileImage: z.string().refine((value) => Number(value) >= 1, {
      message: '프로필 사진을 업로드해 주세요.',
    }),

    name: z
      .string()
      .min(2, '최소 2글자여야 합니다.')
      .max(20, '최대 20자리 이하이어야 합니다.'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });
