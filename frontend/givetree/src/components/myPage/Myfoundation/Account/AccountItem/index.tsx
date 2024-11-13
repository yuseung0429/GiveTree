import Flex from '@/components/common/Flex';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { FaRegCircleCheck } from 'react-icons/fa6';

interface AccountItemProps {
  id: string;
  name: string;
  accountNumber: string;
  balance: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function AccountItem({
  id,
  name,
  accountNumber,
  balance,
  isSelected,
  onSelect,
}: AccountItemProps) {
  console.log('AccountItem props:', { id, name, accountNumber, balance, isSelected });
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
          width={50}
          height={50}
          backgroundColor={colorPalette.danger[100]}
          borderRadius={30}
        />
        <Flex flexDirection="column" gap={6}>
          <Typography
            size={18}
            weight="semiBold"
            color={colorPalette.grey[800]}
          >
            {name}
          </Typography>
          <Typography color={colorPalette.grey[600]}>
            {accountNumber}
          </Typography>
          <Typography weight="medium" color={colorPalette.grey[600]}>
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
