import fetchWrapper from '@/lib/fetchWrapper';

export interface CampaignDonationItem {
  userId: number;
  userImage: string | null;
  userName: string;
  amount: number | 0;
  message: string | null;
  createdAt: string;
}

const getCampaignDonation = async () => {
  const response = await fetchWrapper(`/donations/campaigns`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.content;
};

export default getCampaignDonation;
