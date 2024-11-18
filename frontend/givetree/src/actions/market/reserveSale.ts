'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export default async function reserveSale(saleId: number, purchaserId: number) {
  try {
    const response = await fetchWrapper(`/sales/${saleId}/reserve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        purchaserId,
      }),
    });

    return response.status === 200;
  } catch {
    return false;
  }
}
