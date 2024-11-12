import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

import useNumericInput from '@/hooks/useNumericInput';

import Box from '@/components/common/Box';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import Flex from '@/components/common/Flex';
import FoundationSelector from '@/components/market/FoundationSelector';
import { useEffect, useRef } from 'react';

interface DonationSelectorProps {
  price: number;
  onChange: (contribution: number, foundationId: number) => void;
}

const DonationSelector = ({ price, onChange }: DonationSelectorProps) => {
  const [contribution, handleContributionChange] = useNumericInput(0, price);
  const foundationIdRef = useRef<number>(0);

  useEffect(() => {
    onChange(contribution, foundationIdRef.current);
  }, [contribution]);

  const handleFoundationChange = (id: number) => {
    foundationIdRef.current = id;
    onChange(contribution, foundationIdRef.current);
  };

  return (
    <Box
      padding="1rem"
      borderRadius="0.25rem"
      backgroundColor={colorPalette.grey[100]}
    >
      <Flex flexDirection="column" gap="0.75rem">
        <Typography
          size={typography.size.sm}
          style={{ lineHeight: '1.5', wordBreak: 'keep-all' }}
        >
          거래 완료시 판매 금액 <strong>{price.toLocaleString()}</strong>원 중
          기부할 금액을 입력해 주세요.
        </Typography>
        <TextField onChange={handleContributionChange} defaultValue={0} />
        <FoundationSelector onChange={handleFoundationChange} />
      </Flex>
    </Box>
  );
};

export default DonationSelector;
