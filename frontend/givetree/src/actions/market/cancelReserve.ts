'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export default async function cancelReserve(saleId: number) {
  try {
    const response = await fetchWrapper(`/sales/${saleId}/cancel-reserve`, {
      method: 'PATCH',
    });

    return response.status === 200;
  } catch {
    return false;
  }
}
