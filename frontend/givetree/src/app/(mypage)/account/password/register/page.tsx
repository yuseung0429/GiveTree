'use client';

import Password from '@/components/common/Password';
import { registerPassword } from '@/actions/account/registerPassword';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (password: string) => {
    try {
      const formData = new FormData();
      formData.append('simplePassword', password);

      await registerPassword(formData);
      router.push('/account/setup');
      return {};
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: '비밀번호 등록에 실패했습니다.' };
    }
  };

  return (
    <Password
      title="간편 비밀번호 등록"
      subtitle="6자리 숫자를 입력해주세요"
      onSubmit={handleSubmit}
      mode="register"
    />
  );
}
