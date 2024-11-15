'use client';

import useIsReservedPurchaser from '@/api/market/useIsReservedPurchaser';

import reserveSale from '@/actions/market/reserveSale';
import cancelReserve from '@/actions/market/cancelReserve';

import useDialog from '@/hooks/useDialog';

import Button from '@/components/common/Button';

interface ReservationButtonProps {
  saleId: number;
  purchaserId: number;
}

const ReservationButton = ({ saleId, purchaserId }: ReservationButtonProps) => {
  const { alert, confirm } = useDialog();
  const isReserved = useIsReservedPurchaser(saleId, purchaserId);

  const handleReserveClick = async () => {
    if (await confirm('상대방에게 상품 판매를 예약하시겠습니까?')) {
      if (await reserveSale(saleId, purchaserId)) {
        alert('예약되었습니다.');
      }
    }
  };

  const handleCancelClick = async () => {
    if (await confirm('상품 판매 예약을 취소하시겠습니까?')) {
      if (await cancelReserve(saleId)) {
        alert('취소되었습니다.');
      }
    }
  };

  const handleClick = () => {
    if (isReserved) {
      handleCancelClick();
      return;
    }

    handleReserveClick();
  };

  return (
    <Button
      variant="outlined"
      color={isReserved ? 'danger' : 'success'}
      size="sm"
      onClick={handleClick}
    >
      {isReserved ? '예약취소' : '예약하기'}
    </Button>
  );
};

export default ReservationButton;
