import ChatListItem from '@/components/market/ChatListItem';

export default function ChatListPage() {
  return (
    <>
      {new Array(10).fill(0).map((_, index) => (
        <ChatListItem
          chatroomId={index}
          lastContent="안녕하세요."
          nickname="이유승"
          profileImageUrl=""
          saleId={1}
          key={index}
          title="똥개"
          updatedAt="2024-11-16T06:14:29.722Z"
        />
      ))}
    </>
  );
}
