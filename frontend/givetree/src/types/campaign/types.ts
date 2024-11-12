export interface CampaignData {
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
