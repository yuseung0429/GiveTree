import getChatrooms from '@/api/market/getChatrooms';

import ChatListItem from '@/components/market/ChatListItem';

export default async function ChatList() {
  const chatrooms = await getChatrooms();

  return (
    <>
      {chatrooms.map((item) => (
        <ChatListItem key={item.id} {...item} />
      ))}
    </>
  );
}
