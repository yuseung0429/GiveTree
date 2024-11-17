import getChatrooms from '@/api/market/getChatrooms';

import ChatListItem from '@/components/market/ChatListItem';
import NoChatList from '@/components/market/NoChatList';

export default async function ChatList() {
  const chatrooms = await getChatrooms();

  return (
    <>
      {chatrooms.length === 0 ? (
        <NoChatList />
      ) : (
        chatrooms.map((item) => <ChatListItem key={item.id} {...item} />)
      )}
    </>
  );
}
