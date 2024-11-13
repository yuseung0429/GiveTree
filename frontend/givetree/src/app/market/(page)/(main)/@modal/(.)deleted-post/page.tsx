import DeletedPostLayout from '@/app/market/(modal)/deleted-post/layout';
import DeletedPostPage from '@/app/market/(modal)/deleted-post/page';

export default async function DeletedPostModal() {
  return (
    <DeletedPostLayout>
      <DeletedPostPage />
    </DeletedPostLayout>
  );
}
