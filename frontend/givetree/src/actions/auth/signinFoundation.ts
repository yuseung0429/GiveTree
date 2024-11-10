'use server';

import { redirect } from 'next/navigation';

import { setSession } from '@/lib/session';
import fetchWrapper from '@/lib/fetchWrapper';

import { FormState } from '@/types/formState';

type SigninFoundationState = FormState<'username' | 'password'>;

export default async function signinFoundation(
  _: SigninFoundationState,
  formData: FormData
): Promise<SigninFoundationState> {
  const username = formData.get('username'),
    password = formData.get('password');

  try {
    const response = await fetchWrapper(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const SESSIONID = response.headers
      .getSetCookie()
      .join(';')
      .split('JSESSIONID=')[1]
      ?.split(';')[0];

    switch (response.status) {
      case 200:
        await setSession(SESSIONID);
        break;
      case 403:
        return { message: '아이디 또는 비밀번호를 확인해 주세요.' };
      default:
        return { message: '알 수 없는 오류가 발생하였습니다.' };
    }
  } catch {
    return { message: '로그인 실패하였습니다.' };
  }

  redirect('/');
}
