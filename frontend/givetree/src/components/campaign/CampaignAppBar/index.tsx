'use client';

import AppBar from '@/components/common/AppBar';
import { CampaignData } from '@/types/campaign/types';
import { useRouter } from 'next/navigation';
import { HiOutlineBell } from 'react-icons/hi2';

export default function CampaignAppBar({
  campaign,
}: {
  campaign: CampaignData;
}) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <AppBar title={campaign.name} onBackClick={goBack}>
        <AppBar.Menu onClick={() => alert('알림')}>
          <HiOutlineBell />
        </AppBar.Menu>
      </AppBar>
    </>
  );
}
