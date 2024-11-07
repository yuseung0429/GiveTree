import { FormState } from '@/types/formState';

export async function signupFoundation(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email'),
    password = formData.get('password'),
    passwordCheck = formData.get('password_check');

  const response = await fetch('https://givetree.co.kr/api/members/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name: '시발',
    }),
  });

  console.log(response);

  return { message: '회원가입 실패' };
}
