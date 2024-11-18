'use client';

import useSWR from 'swr';
import convertParams from '@/utils/convertParams';

interface CampaignData {
  id: number;
  name: string;
  foundationId: number;
  foundationName: string;
  currentFundraisingAmount: number;
  targetFundraisingAmount: number;
  titleImageUrl: string;
  imageUrls: string[];
  startDate: string;
  endDate: string;
  introduction: string;
}

interface CampaignSearchResponse {
  content: CampaignData[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface SearchCampaignsParams {
  name?: string;
  introduction?: string;
  foundationName?: string;
}

const useSearchCampaigns = (params: SearchCampaignsParams = {}) => {
  const { data, error } = useSWR<CampaignSearchResponse>(
    `/campaigns${convertParams({ ...params })}`
  );

  return { data, error };
};

export default useSearchCampaigns;
