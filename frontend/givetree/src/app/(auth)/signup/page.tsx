import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Flex from '@/components/common/Flex';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';

export default function SignUp() {
  return (
    <Flex alignItems="center" height="100%">
      <Box width="100%" padding="1rem">
        <Flex flexDirection="column" gap="1.5rem">
          <Typography as="h2" weight="bold" style={{ lineHeight: 1.5 }}>
            네이버 계정으로
            <br />
            기브트리 시작하기
          </Typography>
          <Typography>닉네임만 입력하면 바로 가입할 수 있어요.</Typography>
          <TextField name="nickname" size="lg" defaultValue="lee유승" />
          <Button size="lg" disabled>
            회원가입
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
