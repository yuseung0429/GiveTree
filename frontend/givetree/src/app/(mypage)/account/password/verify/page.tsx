import Password from '@/components/common/Password';

export default function Page() {
  return (
    <Password
      title="비밀번호 확인"
      subtitle="설정한 비밀번호를 다시 입력해주세요."
      redirectPath="/account"
    />
  );
}
