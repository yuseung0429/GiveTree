'use server';

import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

type SignupFoundationState = FormState<
  | 'email'
  | 'password'
  | 'password_check'
  | 'name'
  | 'profileImageUrl'
  | 'introduction'
  | 'corporateRegistrationNumber'
  | 'phoneNumber'
  | 'address'
  | 'titleImageUrl'
  | 'imageUrls'
>;

export default async function signupFoundation(
  _: SignupFoundationState,
  formData: FormData
): Promise<SignupFoundationState> {
  const email = formData.get('email'),
    password = formData.get('password'),
    name = formData.get('name'),
    profileImageUrl = formData.get('profileImageUrl'),
    introduction = formData.get('introduction'),
    corporateRegistrationNumber = formData.get('corporateRegistrationNumber'),
    phoneNumber = formData.get('phoneNumber'),
    address = formData.get('address'),
    titleImageUrl = formData.get('titleImageUrl'),
    imageUrls = formData.getAll('imageUrls'),
    categories = (formData.get('categories') as string).split(',');

  try {
    const response = await fetchWrapper(`/foundations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        profileImageUrl,
        introduction,
        corporateRegistrationNumber,
        phoneNumber,
        address,
        titleImageUrl,
        imageUrls,
        categories,
      }),
    });

    switch (response.status) {
      case 201:
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
