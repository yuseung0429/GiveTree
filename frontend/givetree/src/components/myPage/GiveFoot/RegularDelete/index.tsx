'use client';

import DeleteRegularDonation from '@/actions/donation/deleteRegularDonation';
import Button from '@/components/common/Button';
import useDialog from '@/hooks/useDialog';
import { useRouter } from 'next/navigation';

export default function RegularDelete({
  foundationId,
}: {
  foundationId: string;
}) {
  const router = useRouter();
  const { alert, confirm } = useDialog();

  const handleDeleteClick = async () => {
    if (!(await confirm('정기후원을 취소하시겠습니까?'))) {
      return;
    }

    if (!(await DeleteRegularDonation(foundationId))) {
      alert('후원 취소를 실패하였습니다.');
      return;
    }

    router.push('/givefoot');
  };
  return (
    <>
      <Button color="danger" onClick={handleDeleteClick}>
        정기후원 취소
      </Button>
    </>
  );
}
