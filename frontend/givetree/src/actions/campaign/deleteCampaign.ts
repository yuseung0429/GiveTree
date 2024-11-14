'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export default async function DeleteCampaign(campaignId: string) {
  try {
    const response = await fetchWrapper(`/campaigns/${campaignId}`, {
      method: 'DELETE',
    });

    return response.status === 200;
  } catch {
    return false;
  }
}
