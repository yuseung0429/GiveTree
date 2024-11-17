'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import useDialog from '@/hooks/useDialog';
import useModal from '@/hooks/useModal';

import payItem from '@/actions/market/payItem';

import FormButton from '@/components/common/FormButton';
import ConfirmPassword from '@/components/common/PasswordConfirm';

interface SalePayButtonProps {
  saleId: number;
}

const SalePayButton = ({ saleId }: SalePayButtonProps) => {
  const { push } = useModal();
  const { alert } = useDialog();
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);

  const handlePasswordInput = async (password: string) => {
    router.back();

    setIsPending(true);

    const result = await payItem(saleId, password);

    setIsPending(false);

    if (result.result) {
      await alert('결제가 완료되었습니다.');
      router.push('/mypage');
      return;
    }

    await alert(result.message);
  };

  const handleClick = () => {
    push({ children: <ConfirmPassword popAction={handlePasswordInput} /> });
  };

  return (
    <FormButton size="xl" fullWidth onClick={handleClick} pending={isPending}>
      결제하기
    </FormButton>
  );
};

export default SalePayButton;
