import ChatLayout from '@/app/market/(modal)/chat/layout';
import ChatPage from '@/app/market/(modal)/chat/[saleId]/[chatroomId]/page';

export default function ChatModal({
  params,
}: {
  params: Promise<{ saleId: string; chatroomId: string }>;
}) {
  return (
    <ChatLayout>
      <ChatPage params={params} />
    </ChatLayout>
  );
}
