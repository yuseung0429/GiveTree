import Flex from '@/components/common/Flex';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { FaRegCircleCheck } from 'react-icons/fa6';

interface AccountItemProps {
  id: number;
  accountNumber: string;
  balance: string;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function AccountItem({
  id,
  accountNumber,
  balance,
  isSelected,
  onSelect,
}: AccountItemProps) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      style={{
        backgroundColor: isSelected ? colorPalette.primary[50] : '#FFF',
        padding: '1rem',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={() => onSelect(id)}
    >
      <Flex gap={16} alignItems="center">
        <Box
          width={45}
          height={45}
          backgroundColor={colorPalette.danger[100]}
          borderRadius={30}
        />
        <Flex flexDirection="column" gap={6}>
          <Typography weight="semiBold" color={colorPalette.grey[800]}>
            {accountNumber}
          </Typography>
          <Typography size={14} weight="medium" color={colorPalette.grey[500]}>
            잔액 {balance} 원
          </Typography>
        </Flex>
      </Flex>
      <FaRegCircleCheck
        size={22}
        color={isSelected ? colorPalette.primary[400] : colorPalette.grey[400]}
      />
    </Flex>
  );
}
