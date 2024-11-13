import { SalePostList } from '@/types/market/market';

import fetchWrapper from '@/lib/fetchWrapper';

import convertParams from '@/utils/convertParams';

import MarketItem from '@/components/market/MarketItem';

interface SearchItemListProps {
  page: number;
  query?: string;
}

const SearchItemList = async ({ page, query }: SearchItemListProps) => {
  const response = fetchWrapper(
    `/sales/search${convertParams({ page, query })}`
  );
  const salePostList: SalePostList = await (await response).json();

  console.log(salePostList);

  return (
    <>
      {salePostList.map((item) => (
        <MarketItem key={item.id} {...item} />
      ))}
    </>
  );
};

export default SearchItemList;
