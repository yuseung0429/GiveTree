import { redirect } from 'next/navigation';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

const fetchWrapper = async (url: string, options?: RequestInit) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${url}`,
    options
  );

  if (response.status === 401) {
    redirect('/signin');
  }

  return response;
};

export default fetchWrapper;
