'use server';

import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

type CreateFoundationState = FormState<
  | 'introduction'
  | 'corporateRegistrationNumber'
  | 'phoneNumber'
  | 'address'
  | 'titleImageUrl'
  | 'imageUrls'
>;

export default async function createFoundation(
  _: CreateFoundationState,
  formData: FormData
): Promise<CreateFoundationState> {
  const introduction = formData.get('introduction'),
    corporateRegistrationNumber = formData.get('corporateRegistrationNumber'),
    phoneNumber = formData.get('phoneNumber'),
    address = formData.get('address'),
    titleImageUrl = formData.get('titleImageUrl'),
    imageUrls = formData.get('imageUrls');

  try {
    const response = await fetchWrapper(`/foundations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        introduction,
        corporateRegistrationNumber,
        phoneNumber,
        address,
        titleImageUrl,
        imageUrls,
      }),
    });

    switch (response.status) {
      case 200:
        return { success: true };
      default:
        return {
          message:
            (await response.json()).message ||
            '알 수 없는 오류가 발생하였습니다.',
        };
    }
  } catch {
    return { message: '알 수 없는 오류가 발생하였습니다.' };
  }
}
