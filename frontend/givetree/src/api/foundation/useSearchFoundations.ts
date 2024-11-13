'use client';

import useSWR from 'swr';

import { FoundationSearchList } from '@/types/foundation/foundation';

import convertParams from '@/utils/convertParams';

interface SearchFoundationsParams {
  name?: string;
  category?: string;
}

const useSearchFoundations = (params: SearchFoundationsParams = {}) => {
  const { data, error } = useSWR<FoundationSearchList>(
    `/foundations${convertParams({ ...params })}`
  );
  return { data, error };
};

export default useSearchFoundations;
