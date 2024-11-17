import fetchWrapper from '@/lib/fetchWrapper';

const getCampaignDonationDetail = async (campaignId: number) => {
  const response = await fetchWrapper(`/donations/campaigns/${campaignId}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.content;
};

export default getCampaignDonationDetail;
