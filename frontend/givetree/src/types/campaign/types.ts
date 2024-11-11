export interface CampaignData {
  id: number;
  title: string;
  foundationId: number;
  foundation: string;
  progress: number;
  currentFundraisingAmount: number;
  targetFundraisingAmount: number;
  titleImageUrl: string;
  imageUrls: string[];
  startDate: string;
  endDate: string;
  introduction: string;
}
