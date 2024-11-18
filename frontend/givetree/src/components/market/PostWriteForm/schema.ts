import { z } from 'zod';

export const postWriteSchema = z.object({
  title: z
    .string()
    .min(2, '최소 2자 이상 입력해 주세요.')
    .max(20, '최대 20자까지 입력할 수 있습니다.'),

  description: z
    .string()
    .min(6, '최소 6자 이상 입력해 주세요.')
    .max(1000, '최대 1000자까지 입력할 수 있습니다.'),

  price: z.string().refine((value) => {
    const number = Number(value.replaceAll(',', ''));
    return number >= 1 && number <= 999_999_999;
  }, '1원 이상, 10억 미만으로 입력해 주세요.'),

  imageUrls: z.string().refine((value) => Number(value) >= 1, {
    message: '상품 사진을 업로드해 주세요.',
  }),
});
