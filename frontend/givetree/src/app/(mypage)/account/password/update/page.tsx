'use client';

import Password from '@/components/common/Password';
import { updatePassword } from '@/actions/account/updatePassword';
import { useRouter } from 'next/navigation';

export default function UpdatePasswordPage() {
  const router = useRouter();

  const handleSubmit = async (
    password: string
  ): Promise<{ error?: string }> => {
    try {
      const result = await updatePassword(password);
      if (result.success) {
        router.push('/account');
        return {};
      }
      return { error: '비밀번호 수정에 실패했습니다.' };
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: '비밀번호 수정에 실패했습니다.' };
    }
  };

  return (
    <Password
      title="간편비밀번호 수정"
      subtitle="새로운 6자리 비밀번호를 입력해주세요"
      onSubmit={handleSubmit}
    />
  );
}
