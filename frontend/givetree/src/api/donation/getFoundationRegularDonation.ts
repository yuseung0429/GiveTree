import fetchWrapper from '@/lib/fetchWrapper';

const getFoundationRegularDonation = async () => {
  const response = await fetchWrapper(`/donations/foundations/regular`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.content;
};

export default getFoundationRegularDonation;
