import { Pageable } from '@/types/pageable';

export interface TokenItem {
  id: number;
  name: string;
  amount: number;
  createdAt: string;
}

export interface TokenListResult extends Pageable {
  content: TokenItem[];
}
