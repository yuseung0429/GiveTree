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

export interface ChatItem {
  id: number;
  chatroomId: number;
  senderId: number;
  message: string;
  createdAt: string;
}
