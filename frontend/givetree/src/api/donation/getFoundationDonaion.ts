import fetchWrapper from '@/lib/fetchWrapper';

interface DonationFoundation {
  foundationId: number;
  foundationName: string;
  totalDonationAmount: number;
}

const getFoundationDonation = async () => {
  const response = await fetchWrapper(`/donations/foundations/names`, {
    method: 'GET',
  });
  const data: DonationFoundation[] = await response.json();
  return data;
};

export default getFoundationDonation;
