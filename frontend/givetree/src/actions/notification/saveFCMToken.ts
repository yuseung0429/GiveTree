'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export default async function saveFCMToken(token: string) {
  try {
    const response = await fetchWrapper('/notifications/token', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });

    return response.status === 200;
  } catch {
    return false;
  }
}
