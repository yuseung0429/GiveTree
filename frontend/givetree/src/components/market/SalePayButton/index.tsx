'use client';

import FormButton from '@/components/common/FormButton';

interface SalePayButtonProps {
  saleId: number;
}

const SalePayButton = ({ saleId }: SalePayButtonProps) => {
  const handleClick = () => {
    alert(saleId);
  };

  return (
    <FormButton size="xl" fullWidth onClick={handleClick}>
      결제하기
    </FormButton>
  );
};

export default SalePayButton;
