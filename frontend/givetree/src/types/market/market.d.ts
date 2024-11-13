export interface SalePost {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  status: '판매중' | '예약중' | '판매완료';
  productionsCondition: '거의 새 것' | '미개봉' | '사용감 있음';
  isDirectSale: boolean;
  isDeliverySale: boolean;
  createdDateTime: string;
}

export interface SalePostDetail
  extends Omit<SalePost, 'status' | 'imageUrl' | 'productionsCondition'> {
  sellerId: number;
  foundationId: number;
  description: string;
  hits: number;
  imageUrls: string[];
  saleStatus: string;
  contribution: number;
  productionCondition: '거의 새 것' | '미개봉' | '사용감 있음';
}

export type SalePostList = SalePost[];
