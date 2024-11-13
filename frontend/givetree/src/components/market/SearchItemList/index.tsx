import { SalePostList, SaleSearchParameter } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

import convertParams from '@/utils/convertParams';

import MarketItem from '@/components/market/MarketItem';

const SearchItemList = async (params: SaleSearchParameter) => {
  const response = fetchWrapper(`/sales/search${convertParams({ ...params })}`);
  const salePostList: SalePostList = await (await response).json();

  return (
    <>
      {salePostList.map((item) => (
        <MarketItem key={item.id} {...item} />
      ))}
    </>
  );
};

export default SearchItemList;
