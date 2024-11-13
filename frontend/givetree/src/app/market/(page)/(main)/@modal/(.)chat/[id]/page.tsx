import ChatLayout from '@/app/market/(modal)/chat/layout';
import ChatPage from '@/app/market/(modal)/chat/[id]/page';

export default function ChatModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <ChatLayout>
      <ChatPage params={params} />
    </ChatLayout>
  );
}
