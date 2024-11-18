'use client';

import useSWR from 'swr';

const useGetReservedPurchaser = (saleId: number) => {
  const { data } = useSWR<{ bookerId: number }>(`/sales/${saleId}/booker`, {
    errorRetryCount: 0,
  });
  return data?.bookerId;
};

export default useGetReservedPurchaser;
