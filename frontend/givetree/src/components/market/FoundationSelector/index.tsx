import { useState } from 'react';

import useModal from '@/hooks/useModal';

import colorPalette from '@/styles/tokens/colorPalette';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import FoundationSelectModal from '@/components/market/FoundationSelectModal';

interface FoundationSelectorProps {
  onChange: (id: number) => void;
}

const FoundationSelector = ({ onChange }: FoundationSelectorProps) => {
  const [foundation, setFoundation] = useState({ foundationId: 0, name: '' });

  const { push } = useModal();

  const handleFoundationSelect = (id: number, name: string) => {
    setFoundation({ foundationId: id, name });
    onChange(id);
  };

  const handleSelectClick = () => {
    push({
      children: <FoundationSelectModal onSelect={handleFoundationSelect} />,
    });
  };

  return (
    <Box
      padding="0.75rem"
      borderRadius="0.5rem"
      backgroundColor={colorPalette.grey[300]}
    >
      <Flex alignItems="center" justifyContent="space-between">
        {foundation.foundationId === 0 ? (
          <Typography ellipsis>기부할 재단을 선택해 주세요.</Typography>
        ) : (
          <Typography ellipsis>{foundation.name}</Typography>
        )}
        <Button type="button" size="sm" onClick={handleSelectClick}>
          선택
        </Button>
      </Flex>
    </Box>
  );
};

export default FoundationSelector;
