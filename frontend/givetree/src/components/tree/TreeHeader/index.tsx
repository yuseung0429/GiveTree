'use client';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as styles from './treeHeader.css';
import { TreeCurrentMessage } from '@/types/tree/types';
import { useRouter } from 'next/navigation';

export default function TreeHeader({
  currentTreeMessage,
}: {
  currentTreeMessage: TreeCurrentMessage;
}) {
  const router = useRouter();
  const { campaignId, campaignName, totalCount, foundationName } =
    currentTreeMessage;

  const handleMoreTrees = () => {
    router.push(`/tree/${campaignId}/0`);
  };

  return (
    <>
      <Typography as="h3" weight="medium" color={colorPalette.text[50]}>
        {foundationName}
      </Typography>
      <Box className={styles.messageText}>
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}
        >
          <Typography
            as="h2"
            weight="semiBold"
            color={colorPalette.secondary[100]}
          >
            {campaignName}
          </Typography>
          <Typography
            as="h3"
            weight="semiBold"
            color={colorPalette.text[50]}
            style={{ marginBottom: '0.2rem' }}
          >
            에
          </Typography>
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'end' }}
        >
          <Typography
            as="h2"
            weight="semiBold"
            color={colorPalette.secondary[100]}
          >
            {totalCount}개
          </Typography>
          <Typography as="h2" weight="semiBold" color={colorPalette.text[50]}>
            의 메세지가 전달됐어요!
          </Typography>
        </div>
        <div className={styles.moreButton}>
          <Button color="success" size="sm" onClick={handleMoreTrees}>
            캠페인 트리 더보기
          </Button>
        </div>
      </Box>
    </>
  );
}
