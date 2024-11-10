'use client';

import Flex from '@/components/common/Flex';
import AccountItem from '@/components/myPage/Myfoundation/Account/AccountItem';
import { useState } from 'react';

export default function Page() {
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );

  const accounts = [
    { id: 1, accountNumber: '기업은행 8757', balance: '567,000' },
    { id: 2, accountNumber: '국민은행 1234', balance: '1,234,000' },
    { id: 3, accountNumber: '신한은행 5678', balance: '890,000' },
  ];

  const handleSelect = (id: number) => {
    setSelectedAccountId(id === selectedAccountId ? null : id);
  };

  return (
    <Flex flexDirection="column" gap={16}>
      {accounts.map((account) => (
        <AccountItem
          key={account.id}
          id={account.id}
          accountNumber={account.accountNumber}
          balance={account.balance}
          isSelected={account.id === selectedAccountId}
          onSelect={handleSelect}
        />
      ))}
    </Flex>
  );
}
