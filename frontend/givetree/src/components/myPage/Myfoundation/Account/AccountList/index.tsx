'use client';

import { useState } from 'react';
import AccountItem from '@/components/myPage/Myfoundation/Account/AccountItem';
import { Account } from '@/api/account/getAllAcounts';

interface AccountListProps {
  accounts: Account[];
}

export default function AccountList({ accounts }: AccountListProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );

  const handleSelect = (accountNumber: string) => {
    setSelectedAccountId(
      accountNumber === selectedAccountId ? null : accountNumber
    );
  };

  return (
    <>
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
    </>
  );
}
