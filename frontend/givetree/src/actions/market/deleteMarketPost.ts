'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export default async function deleteMarketPost(id: number) {
  try {
    const response = await fetchWrapper(`/sales/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.status === 200;
  } catch {
    return false;
  }
}
