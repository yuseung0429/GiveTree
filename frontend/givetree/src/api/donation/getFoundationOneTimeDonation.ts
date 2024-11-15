import fetchWrapper from '@/lib/fetchWrapper';

const getFoundationOneTimeDonation = async () => {
  const response = await fetchWrapper(`/donations/foundations`, {
    method: 'GET',
  });
  const data = await response.json();
  return data.content;
};

export default getFoundationOneTimeDonation;
