import PostLayout from '@/app/market/(modal)/post/layout';
import PostPage from '@/app/market/(modal)/post/[id]/page';

export default async function PostModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <PostLayout>
      <PostPage params={params} />
    </PostLayout>
  );
}
