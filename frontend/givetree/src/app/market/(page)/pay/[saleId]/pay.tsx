import Flex from '@/components/common/Flex';
import PayItemInfo from '@/components/market/PayItemInfo';
import SalePayButton from '@/components/market/SalePayButton';

interface PayProps {
  saleId: number;
}

const Pay = ({ saleId }: PayProps) => {
  return (
    <Flex flexDirection="column" height="100%">
      <div style={{ flex: '0 0 auto' }}>
        <PayItemInfo saleId={saleId} />
      </div>
      <div style={{ flex: '0 0 auto', padding: '0.5rem' }}>
        <SalePayButton saleId={saleId} />
      </div>
    </Flex>
  );
};

export default Pay;
