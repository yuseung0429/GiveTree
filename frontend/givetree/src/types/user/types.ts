export interface UserData {
  id: number;
  email: string;
  name: string;
  profileImageUrl: string;
  role: string;
}

export interface FoundationData {
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
  titleImageUrl: string;
  imageUrls: string[];
  holdingCampaignCount: number;
  categories: string[];
}
