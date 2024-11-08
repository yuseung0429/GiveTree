'use client';

import { useActionState, useEffect } from 'react';

import signinFoundation from '@/app/actions/auth/signinFoundation';

import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import FormButton from '@/components/common/FormButton';
import TextField from '@/components/common/TextField';

const FoundationSigninForm = () => {
  const [state, action, isPending] = useActionState(signinFoundation, {});

  useEffect(() => {
    if (state.message) {
      alert(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <Flex flexDirection="column" gap="0.75rem">
        <TextField
          variant="outlined"
          name="username"
          placeholder="이메일 주소"
        />
        <TextField
          variant="outlined"
          type="password"
          name="password"
          placeholder="비밀번호"
        />
        <Box paddingTop="1rem">
          <FormButton
            variant="contained"
            size="lg"
            pending={isPending}
            fullWidth
          >
            로그인
          </FormButton>
        </Box>
      </Flex>
    </form>
  );
};

export default FoundationSigninForm;
