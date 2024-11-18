'use client';

import { startTransition, useActionState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import useDialog from '@/hooks/useDialog';

import writeMarketPost from '@/actions/market/writeMarketPost';

import Box from '@/components/common/Box';
import PostWriteForm from '@/components/market/PostWriteForm';

export default function WritePage() {
  const router = useRouter();

  const { alert } = useDialog();

  const [state, action, isPending] = useActionState(writeMarketPost, {});

  useEffect(() => {
    if (state.success) {
      (async () => {
        await alert('판매 게시글이 등록되었습니다.');
        router.push('/market');
      })();
    }

    if (state.message) {
      alert(state.message);
    }
  }, [alert, state, router]);

  const handleSubmit = (formData: FormData) => {
    startTransition(() => action(formData));
  };

  return (
    <Box padding="1rem">
      <PostWriteForm isPending={isPending} onSubmit={handleSubmit} />
    </Box>
  );
}
