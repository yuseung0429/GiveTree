'use client';

import { useState } from 'react';
import Box from '@/components/common/Box';
import * as style from './wallet.css';
import Typography from '@/components/common/Typography';
import Flex from '@/components/common/Flex';
import Link from 'next/link';
import colorPalette from '@/styles/tokens/colorPalette';
import { IoMdRefresh } from 'react-icons/io';
import { FaTree } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';
import Button from '@/components/common/Button';
import { getTokenBalance } from '@/api/token/getTokenBalance';
import ExpenseItem from '@/components/common/ExpenseItem';
import type { PaginatedResponse } from '@/api/ledger/getLedger';

interface WalletContainerProps {
  initialBalance: Awaited<ReturnType<typeof getTokenBalance>>;
  ledgerData: {
    ok: boolean;
    data?: PaginatedResponse;
    message?: string;
    status?: number;
  };
  refreshAction: () => Promise<void>;
}

export default function WalletContainer({
  initialBalance,
  ledgerData,
  refreshAction,
}: WalletContainerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await refreshAction();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 월렛 계좌 */}
      <Box className={style.grabox}>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          className={style.walletcontainer}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="4px">
              <FaTree size={16} color={colorPalette.primary[600]} />
              <Typography weight="semiBold" size={18}>
                굿네이버스 월렛
              </Typography>
            </Flex>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <IoMdRefresh
                size={22}
                color={colorPalette.grey[800]}
                className={isLoading ? style.spinningRefresh : ''}
              />
            </button>
          </Flex>
          <Typography
            size={20}
            weight="bold"
            color={colorPalette.primary[600]}
            style={{ textAlign: 'center' }}
          >
            {initialBalance.data?.balance.toLocaleString() ?? '0'}원
          </Typography>
          <Link href="wallet/exchange">
            <Button fullWidth>출금하기</Button>
          </Link>
        </Flex>
      </Box>

      {/* 지갑 출금내역 보기 */}
      <Box className={style.listcontainer}>
        <Flex justifyContent="space-between" alignItems="center">
          <Typography
            weight="semiBold"
            size={20}
            color={colorPalette.primary[500]}
          >
            지갑 출금내역
          </Typography>
          <Link href="/wallet/all" className={style.allbtn}>
            <Typography>전체보기</Typography>
            <MdNavigateNext size={18} />
          </Link>
        </Flex>
        {/* 리스트 */}
        <Flex flexDirection="column" gap="10px" style={{ padding: '15px 0' }}>
          {ledgerData.ok && ledgerData.data ? (
            ledgerData.data.content && ledgerData.data.content.length > 0 ? (
              ledgerData.data.content.map((entry) => (
                <ExpenseItem
                  key={entry.processedAt}
                  date={entry.processedAt}
                  message={entry.message}
                  amount={entry.amount}
                  type={entry.type}
                  borderColor={colorPalette.grey[300]}
                  amountColor={
                    entry.type === 'EXCHANGE'
                      ? colorPalette.secondary[300]
                      : colorPalette.primary[600]
                  }
                />
              ))
            ) : (
              <Flex
                justifyContent="center"
                alignItems="center"
                style={{
                  minHeight: '300px',
                  backgroundColor: '#b2dfdb69',
                  borderRadius: '10px',
                }}
              >
                <Typography color={colorPalette.grey[600]}>
                  출금 내역이 없습니다.
                </Typography>
              </Flex>
            )
          ) : (
            <Flex
              justifyContent="center"
              alignItems="center"
              style={{
                minHeight: '300px',
                backgroundColor: '#b2dfdb69',
                borderRadius: '10px',
              }}
            >
              <Typography color={colorPalette.grey[600]}>
                {ledgerData.message || '입출금 내역을 불러올 수 없습니다.'}
              </Typography>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
}
