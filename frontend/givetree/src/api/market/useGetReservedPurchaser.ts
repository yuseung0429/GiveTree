'use client';

import useSWR from 'swr';

const useGetReservedPurchaser = (saleId: number) => {
  const { data } = useSWR<{ booker: number }>(`/sales/${saleId}/booker`, {
    errorRetryCount: 0,
  });
  return data?.booker;
};

export default useGetReservedPurchaser;
