import Image from 'next/image';
import * as styles from './[id].css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import CampaignDetail from '@/components/campaign/CampaignDetail';
import fetchWrapper from '@/lib/fetchWrapper';
import getSessionMember from '@/api/member/getSessionMember';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const campaignId = (await params).id;
  const { role } = await getSessionMember();
  const response = await fetchWrapper(`/campaigns/${campaignId}`, {
    method: 'GET',
  });
  const campaignData = await response.json();

  const {
    id,
    name,
    foundationName,
    currentFundraisingAmount,
    targetFundraisingAmount,
    titleImageUrl,
    imageUrls,
    startDate,
    endDate,
    introduction,
  } = campaignData || {
    id: 0,
    name: '',
    foundationName: '',
    currentFundraisingAmount: 0,
    targetFundraisingAmount: 0,
    titleImageUrl: '',
    imageUrls: [],
    startDate: '',
    endDate: '',
    introduction: '',
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.coverImgContainer}
        style={{ backgroundImage: `url('${titleImageUrl}')` }}
      >
        <Image
          src={titleImageUrl}
          alt="campaign main image"
          width={250}
          height={250}
          className={styles.coverImg}
        />
      </div>
      <div style={{ padding: '0.5rem 1rem' }}>
        <Typography
          as="h2"
          weight="semiBold"
          color={colorPalette.text[900]}
          className={styles.title}
        >
          {name}
        </Typography>

        <Typography
          as="h4"
          weight="semiBold"
          color={colorPalette.text[600]}
          className={styles.subTitle}
        >
          {foundationName}
        </Typography>
        <div className={styles.periodWrapper}>
          <Typography as="h4" weight="medium" color={colorPalette.text[900]}>
            모금기간 &nbsp;|&nbsp; {startDate} ~ {endDate}
          </Typography>
        </div>

        <CampaignDetail
          id={id}
          role={role}
          introduction={introduction}
          imageUrls={imageUrls}
          currentFundraisingAmount={currentFundraisingAmount}
          targetFundraisingAmount={targetFundraisingAmount}
          endDate={endDate}
        />
      </div>
    </div>
  );
}
