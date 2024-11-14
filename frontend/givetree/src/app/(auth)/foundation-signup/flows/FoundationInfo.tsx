'use client';

import FoundationInfoForm from '@/components/auth/FoundationInfoForm';
import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

interface FoundationInfoProps {
  formData: FormData;
  onBackClick: () => void;
  onSubmit: () => void;
}

const FoundationInfo = ({
  formData,
  onBackClick,
  onSubmit,
}: FoundationInfoProps) => {
  return (
    <Flex flexDirection="column">
      <Flex alignItems="center" justifyContent="space-between" gap="0.5rem">
        <Flex flexDirection="column" gap="0.5rem">
          <Typography as="h2" weight="semiBold">
            재단 정보
          </Typography>
          <Typography>재단에 관한 정보를 입력해 주세요.</Typography>
        </Flex>
        <div>
          <Button
            size="sm"
            variant="outlined"
            color="secondary"
            onClick={onBackClick}
          >
            이전 단계로
          </Button>
        </div>
      </Flex>

      <Box marginTop="1.5rem">
        <FoundationInfoForm formData={formData} onSubmit={onSubmit} />
      </Box>
    </Flex>
  );
};

export default FoundationInfo;
