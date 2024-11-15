'use client';

import Password from '@/components/common/Password';
import { confirmPassword } from '@/actions/account/confirmPassword';

export default function ConfirmPassword({
  popAction,
}: {
  popAction: (password: string) => void;
}) {
  const handleSubmit = async (password: string) => {
    const formData = new FormData();
    formData.append('simplePassword', password);
    try {
      const result = await confirmPassword(formData);
      if (result.success) {
        popAction(password);
      }
      return {};
    } catch (error) {
      if (error instanceof Error) {
        return { error: error.message };
      }
      return { error: '예상치 못한 오류가 발생했습니다.' };
    }
  };

  return (
    <div style={{ width: '100vw' }}>
      <Password
        title="결제 비밀번호 입력"
        subtitle="6자리 숫자를 입력해주세요"
        onSubmit={handleSubmit}
        mode="confirm"
      />
    </div>
  );
}
