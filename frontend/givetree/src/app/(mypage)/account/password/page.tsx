'use client';

import { useState } from 'react';
import Password from '@/components/common/Password';
import { registerPassword } from '@/actions/account/registerPassword';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [step, setStep] = useState<'first' | 'verify'>('first');
  const [firstPassword, setFirstPassword] = useState<string>('');
  const router = useRouter();

  if (step === 'first') {
    return (
      <Password
        key={0}
        title="비밀번호 입력"
        subtitle="비밀번호를 입력해주세요."
        onSubmit={async (password) => {
          console.log('First step submit called');
          setFirstPassword(password);
          setStep('verify');
          return {};
        }}
      />
    );
  }

  return (
    <Password
      key={1}
      title="비밀번호 확인"
      subtitle="설정한 비밀번호를 다시 입력해주세요."
      onSubmit={async (password) => {
        console.log('Verify step submit called');
        if (password !== firstPassword) {
          return { error: '비밀번호가 일치하지 않습니다.' };
        }

        try {
          console.log('Attempting to register password');
          const formData = new FormData();
          formData.append('simplePassword', password);
          const result = await registerPassword(formData);

          if (result.success) {
            router.push('/account');
          }

          return {};
        } catch (error) {
          return {
            error:
              error instanceof Error
                ? error.message
                : '비밀번호 등록에 실패했습니다.',
          };
        }
      }}
    />
  );
}
