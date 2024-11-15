import fetchWrapper from '@/lib/fetchWrapper';

const getCampaignDonation = async () => {
  const response = await fetchWrapper(`/donations/campaigns`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.content;
};

export default getCampaignDonation;
