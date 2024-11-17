export interface ChatroomItem {
  id: number;
  saleId: number;
  saleTitle: string;
  counterpartId: number;
  counterpartName: number;
  counterpartProfileImageUrl: string | null;
  lastMessage: string;
  lastMessageCreatedAt: string;
}
