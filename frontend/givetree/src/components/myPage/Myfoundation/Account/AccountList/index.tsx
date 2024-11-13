'use client';

import { useState } from 'react';
import AccountItem from '@/components/myPage/Myfoundation/Account/AccountItem';
import { Account } from '@/api/account/getAllAcounts';
import Flex from '@/components/common/Flex';
import Button from '@/components/common/Button';
import colorPalette from '@/styles/tokens/colorPalette';
import Typography from '@/components/common/Typography';
import { FaTree } from 'react-icons/fa';
import { registerAccount } from '@/actions/account/registerAccount';
import { useRouter } from 'next/navigation';

interface AccountListProps {
  accounts: Account[];
}

export default function AccountList({ accounts }: AccountListProps) {
  const router = useRouter();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );

  const handleSelect = (accountNumber: string) => {
    console.log('AccountList - Selecting account:', accountNumber);
    const newSelectedId =
      accountNumber === selectedAccountId ? null : accountNumber;
    setSelectedAccountId(newSelectedId);
  };

  console.log('Accounts data:', accounts);

  const handleRegister = async () => {
    if (!selectedAccountId) {
      alert('계좌를 선택해주세요.');
      return;
    }

    try {
      const result = await registerAccount(selectedAccountId);
      if (result.success) {
        router.push('/account');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('계좌 등록에 실패했습니다.');
      }
    }
  };

  return (
    <>
      <main style={{ backgroundColor: '#F5F5F5', padding: '1rem' }}>
        <Flex
          alignItems="center"
          justifyContent="center"
          style={{ padding: '1rem 0', margin: '0 auto' }}
        >
          <FaTree
            size={18}
            color={colorPalette.primary[500]}
            style={{ marginRight: '0.25rem' }}
          />
          <Typography
            size={18}
            weight="semiBold"
            color={colorPalette.grey[800]}
          >
            GIVE에서 사용하실 계좌를
            <span
              style={{
                color: `${colorPalette.primary[500]}`,
                margin: '0 0.25rem',
              }}
            >
              선택
            </span>
            해주세요
          </Typography>
        </Flex>
        <Flex>
          {accounts.map((account) => (
            <AccountItem
              key={account.accountNumber}
              id={account.accountNumber}
              name={account.name}
              accountNumber={`${account.bankName} ${account.accountNumber}`}
              balance={account.balance.toLocaleString()}
              isSelected={account.accountNumber === selectedAccountId}
              onSelect={handleSelect}
            />
          ))}
        </Flex>
      </main>
      <footer style={{ padding: '10px', backgroundColor: '#F5F5F5' }}>
        <Button
          size="lg"
          fullWidth
          onClick={handleRegister}
          disabled={!selectedAccountId}
        >
          등록하기
        </Button>
      </footer>
    </>
  );
}
