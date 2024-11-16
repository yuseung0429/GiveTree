'use client';

import { useRouter } from 'next/navigation';

import useDialog from '@/hooks/useDialog';

import isReserved from '@/api/market/isReserved';

import Button from '@/components/common/Button';

interface PurchaseButtonProps {
  saleId: number;
}

const PurchaseButton = ({ saleId }: PurchaseButtonProps) => {
  const { alert } = useDialog();
  const router = useRouter();

  const handleClick = async () => {
    if (!(await isReserved(saleId))) {
      alert('판매자가 나를 예약자로 등록해야 합니다.');
    }

    router.push(`/market/pay/${saleId}`);
  };

  return (
    <Button variant="outlined" size="sm" onClick={handleClick}>
      구매하기
    </Button>
  );
};

export default PurchaseButton;
