export type SaleStatus = '판매중' | '예약중' | '판매완료';
export type ProductionCondition = '거의 새 것' | '미개봉' | '사용감 있음';

export interface SalePost {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  status: SaleStatus;
  productionsCondition: ProductionCondition;
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
  productionCondition: ProductionCondition;
}

export interface SaleSearchParameter {
  page?: number;
  size?: number;
  query?: string;
  statuses?: string[];
  productionConditions?: string[];
  isDirectSale?: boolean;
  isDeliverySale?: boolean;
}

export type SalePostList = SalePost[];
