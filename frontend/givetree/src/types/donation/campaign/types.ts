export interface CampaignDonation {
  foundationId: number;
  foundationImage: string;
  foundationName: string;
  campaignId: number;
  campaignName: string;
  amount: number;
  message: string | null;
  createdAt: string;
}