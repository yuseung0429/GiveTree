import getCurrentTreeMessage from '@/api/tree/getCurrentTreeMessage';
import Box from '@/components/common/Box';
import TreeHeader from '@/components/tree/TreeHeader';
import TreeSlider from '@/components/tree/TreeSlider';
import { TreeCurrentMessage } from '@/types/tree/types';
import * as styles from './page.css';

export default async function Page({
  params,
}: {
  params: Promise<{ page: string; id: string }>;
}) {
  const page = Number((await params).page) || 0;
  const currentCampaignId = Number((await params).id) || 0;

  let currentTreeMessage: TreeCurrentMessage = {
    campaignId: 0,
    campaignName: '',
    totalCount: 0,
    messages: [],
    foundationName: '',
  };

  if (currentCampaignId === 0) {
    currentTreeMessage = await getCurrentTreeMessage();
  } else {
    currentTreeMessage = await getCurrentTreeMessage({
      currentCampaignId,
    });
  }

  const { campaignId, totalCount } = currentTreeMessage;

  return (
    <Box className={styles.background}>
      <Box className={styles.teamText}>
        <TreeHeader currentTreeMessage={currentTreeMessage} />
      </Box>
      <Box className={styles.treeImage}>
        <TreeSlider
          campaignId={campaignId}
          page={page}
          totalCount={totalCount}
        />
      </Box>
    </Box>
  );
}
