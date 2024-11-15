'use client';

import useSWR from 'swr';

import type { UserData } from '@/types/user/types';

const useGetMember = (id: number) => {
  const { data } = useSWR<UserData>(`/members/${id}`, {
    dedupingInterval: 60000,
  });
  return data;
};

export default useGetMember;
