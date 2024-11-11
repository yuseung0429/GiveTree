import 'server-only';

import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { redirect } from 'next/navigation';

import { getCookie } from '@/lib/session';

const fetchWrapper = async (url: string, options?: RequestInit) => {
  const overriddenOptions = options;

  if (overriddenOptions) {
    overriddenOptions.headers = {
      ...overriddenOptions.headers,
      Cookie: await getCookie(),
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    overriddenOptions
  );

  if (response.status === 401) {
    redirect('/signin');
  }

  return response;
};

export default fetchWrapper;
