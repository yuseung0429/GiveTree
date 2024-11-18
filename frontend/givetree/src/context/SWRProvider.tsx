'use client';

import { ReactNode } from 'react';

import { SWRConfig } from 'swr';

import { axiosInstance } from '@/api/axiosInstance';

const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosInstance.get(url).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
