import { Pageable } from '@/types/pageable';

export interface FoundationSearchItem {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
  role: string;
  introduction: string;
  corporateRegistrationNumber: string;
  totalFundraisingAmount: number;
  executedAmount: number;
  phoneNumber: string;
  address: string;
  holdingCampaignCount: number;
  titleImageUrl: string;
  imageUrls: string[];
  categories: string[];
}

export interface FoundationSearchList extends Pageable {
  content: FoundationSearchItem[];
}
