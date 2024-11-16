export interface TreeCurrentParams {
  currentCampaignId?: number;
}

export interface TreeParams {
  page?: number;
  size?: number;
}

export interface Message {
  name: string;
  message: string;
}

export interface TreeMessage {
  messages: Message[];
}

export interface TreeCurrentMessage {
  campaignId: number;
  campaignName: string;
  totalCount: number;
  messages: Message[];
}
