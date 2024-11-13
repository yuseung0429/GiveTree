import type { SaleSearchParameter } from '@/types/market/market';

import { HiCloud } from 'react-icons/hi2';

import searchSalePosts from '@/api/market/searchSalePost';

import colorPalette from '@/styles/tokens/colorPalette';

import Typography from '@/components/common/Typography';
import MarketItem from '@/components/market/MarketItem';

import * as s from './SearchItemList.css';

const SearchItemList = async (params: SaleSearchParameter) => {
  const salePostList = await searchSalePosts(params);

  return (
    <>
      {salePostList.length ? (
        salePostList.map((item) => <MarketItem key={item.id} {...item} />)
      ) : (
        <div className={s.noItem}>
          <HiCloud color={colorPalette.primary[900]} size={'5rem'} />
          <Typography>게시글이 존재하지 않습니다.</Typography>
        </div>
      )}
    </>
  );
};

export default SearchItemList;
