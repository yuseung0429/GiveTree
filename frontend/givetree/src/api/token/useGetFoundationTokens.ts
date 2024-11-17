'use client';

import useSWR from 'swr';

import { TokenListResult } from '@/types/token/token';

const useGetFoundationTokenList = () => {
  const { data } = useSWR<TokenListResult>('/tokens/donations/foundations');

  return {
    content: [
      {
        id: 60,
        name: '유승산타',
        amount: 10,
        createdAt: '2024-11-17T17:55:57.05488',
      },
      {
        id: 58,
        name: '유승산타',
        amount: 100,
        createdAt: '2024-11-17T17:55:55.036698',
      },
      {
        id: 56,
        name: '유승산타',
        amount: 1000,
        createdAt: '2024-11-17T17:55:53.149237',
      },
      {
        id: 54,
        name: '유승산타',
        amount: 10000,
        createdAt: '2024-11-17T17:55:51.375492',
      },
      {
        id: 52,
        name: '유승산타',
        amount: 50000,
        createdAt: '2024-11-17T17:55:46.948947',
      },
      {
        id: 50,
        name: '유승산타',
        amount: 5000,
        createdAt: '2024-11-17T17:55:45.002803',
      },
      {
        id: 48,
        name: '유승산타',
        amount: 500,
        createdAt: '2024-11-17T17:55:43.13448',
      },
      {
        id: 46,
        name: '유승산타',
        amount: 50,
        createdAt: '2024-11-17T17:55:39.865669',
      },
      {
        id: 33,
        name: '유승산타',
        amount: 5000,
        createdAt: '2024-11-15T16:55:15.394757',
      },
      {
        id: 27,
        name: '유승산타',
        amount: 5000,
        createdAt: '2024-11-15T13:44:24.356917',
      },
      {
        id: 25,
        name: '유승산타',
        amount: 500,
        createdAt: '2024-11-15T13:44:21.553124',
      },
      {
        id: 23,
        name: '유승산타',
        amount: 50,
        createdAt: '2024-11-15T13:44:17.684477',
      },
      {
        id: 4,
        name: '유승산타',
        amount: 50000,
        createdAt: '2024-11-15T10:00:28.434819',
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 20,
      sort: { empty: true, sorted: false, unsorted: true },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    size: 20,
    number: 0,
    sort: { empty: true, sorted: false, unsorted: true },
    first: true,
    last: true,
    numberOfElements: 13,
    empty: false,
  };
  // return data;
};

export default useGetFoundationTokenList;
