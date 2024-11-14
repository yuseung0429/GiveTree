import { z } from 'zod';

export const foundationtInfoSchema = z.object({
  corporateRegistrationNumber: z
    .string()
    .regex(/^\d[\d-]*\d$/, '잘못된 형식입니다.')
    .min(1, '1자 이상 입력해야 합니다.')
    .max(20, '20자 이하로 입력해야 합니다.'),

  phoneNumber: z
    .string()
    .regex(/^01\d-\d{4}-\d{4}$/, '01x-xxxx-xxxx 형식이어야 합니다.'),

  address: z
    .string()
    .trim()
    .min(1, '최소 1자 이상이어야 합니다.')
    .max(30, '최대 30자까지 입력할 수 있습니다.'),

  introduction: z
    .string()
    .trim()
    .min(1, '최소 1자 이상이어야 합니다.')
    .max(1000, '최대 1000자까지 입력할 수 있습니다.'),

  titleImageUrl: z.string().refine((value) => Number(value) >= 1, {
    message: '대표 이미지를 업로드해 주세요.',
  }),

  imageUrls: z.string().refine((value) => Number(value) >= 1, {
    message: '기타 이미지를 업로드해 주세요.',
  }),

  categories: z
    .string()
    .trim()
    .min(1, '최소 1자 이상이어야 합니다.')
    .max(50, '최대 50자까지 입력할 수 있습니다.'),
});
