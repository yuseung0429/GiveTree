'use client';

import { useState } from 'react';
import Account from '@/components/common/Account';
import Flex from '@/components/common/Flex';
import { RegisteredAccount } from '@/api/account/getRegisteredAccount';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { deleteAccount } from '@/actions/account/deleteAccount';
import Link from 'next/link';

interface AccountClientProps {
  initialAccount: RegisteredAccount | null;
  hasPassword?: boolean;
}

export default function AccountClient({
  initialAccount,
  hasPassword = false,
}: AccountClientProps) {
  const [registeredAccount, setRegisteredAccount] =
    useState<RegisteredAccount | null>(initialAccount);
  const router = useRouter();

  const handleAddAccount = () => {
    if (registeredAccount) return;

    if (!hasPassword) {
      alert('간편비밀번호를 먼저 설정해주세요.');
      router.push('/account/password/register');
      return;
    }
    router.push('/account/setup');
  };

  const handlePasswordUpdate = () => {
    router.push('/account/password/update');
  };

  const handleDeleteAccount = async () => {
    if (!registeredAccount) return;

    if (confirm('계좌를 삭제하시겠습니까?')) {
      try {
        const result = await deleteAccount();
        if (result.success) {
          setRegisteredAccount(null);
          router.refresh();
          alert('계좌가 삭제되었습니다.');
        }
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('계좌 삭제에 실패했습니다.');
        }
      }
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" gap={16}>
      <div onClick={handleAddAccount}>
        <Account registeredAccount={registeredAccount} />
      </div>
      {hasPassword ? (
        <Button
          variant="outlined"
          style={{ width: '280px' }}
          onClick={handlePasswordUpdate}
        >
          간편비밀번호 수정하기
        </Button>
      ) : (
        <Link href="/account/password/register">
          <Button variant="outlined" style={{ width: '280px' }}>
            간편비밀번호 설정하기
          </Button>
        </Link>
      )}
      {registeredAccount && (
        <Button
          variant="outlined"
          color="grey"
          onClick={handleDeleteAccount}
          style={{ width: '280px' }}
        >
          계좌 삭제
        </Button>
      )}
    </Flex>
  );
}
