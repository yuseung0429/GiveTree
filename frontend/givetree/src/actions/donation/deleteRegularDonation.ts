'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export default async function DeleteRegularDonation(foundationId: string) {
  try {
    const response = await fetchWrapper(
      `/donations/foundations/${foundationId}/regular`,
      {
        method: 'DELETE',
      }
    );

    return response.status === 200;
  } catch {
    return false;
  }
}
