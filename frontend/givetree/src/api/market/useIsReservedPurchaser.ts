'use client';

// import useSWR from 'swr';

const useIsReservedPurchaser = (saleId: number, purchaserId: number) => {
  // const { data, error } = useSWR<boolean>(
  //   `/foundations`
  // );
  return saleId + purchaserId > 0;
};

export default useIsReservedPurchaser;
