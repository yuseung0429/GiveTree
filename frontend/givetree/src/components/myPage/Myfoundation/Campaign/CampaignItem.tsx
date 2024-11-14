'use client';

import Flex from '@/components/common/Flex';
import * as style from './CampaignItem.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { HiOutlineTrash } from 'react-icons/hi2';
import Image from 'next/image';
import Link from 'next/link';
import DeleteCampaign from '@/actions/campaign/deleteCampaign';
import { useRouter } from 'next/navigation';
import useDialog from '@/hooks/useDialog';

interface CampaignItemProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  targetFundraisingAmount: number;
  currentFundraisingAmount: number;
  titleImageUrl: string;
}

export default function CampaignItem({
  id,
  name,
  startDate,
  endDate,
  targetFundraisingAmount,
  currentFundraisingAmount,
  titleImageUrl,
}: CampaignItemProps) {
  const router = useRouter();
  const { alert, confirm } = useDialog();

  const handleDeleteClick = async () => {
    if (!(await confirm('캠페인을 삭제하시겠습니까?'))) {
      return;
    }

    if (!(await DeleteCampaign(id.toString()))) {
      alert('삭제를 실패하였습니다.');
      return;
    }

    router.refresh();
  };
  const today = new Date();
  const endDateTime = new Date(endDate);

  // 캠페인 상태 확인
  const isCompleted = endDateTime < today;
  const campaignStatus = isCompleted ? '진행 완료' : '진행중';
  const campaignStatusColor = isCompleted
    ? colorPalette.secondary[400]
    : colorPalette.primary[300];

  // 목표 달성 상태 확인
  const isTargetAchieved = currentFundraisingAmount >= targetFundraisingAmount;
  const achievementStatus = isTargetAchieved ? '목표 달성' : '목표 미달성';
  const achievementStatusColor = isTargetAchieved
    ? colorPalette.primary[600]
    : colorPalette.secondary[600];

  // 금액 포맷팅 함수
  const formatAmount = (amount: number) => {
    return amount?.toLocaleString('ko-KR') + '원';
  };

  return (
    <Flex gap="1rem" className={style.container}>
      {/* 사진 */}
      <Box className={style.imgbox}>
        <Link href={`/campaign/${id}`}>
          <Image
            src={titleImageUrl}
            alt="캠페인사진"
            fill
            style={{ objectFit: 'cover' }}
            sizes="125px"
          />
        </Link>
      </Box>

      {/* 설명 */}
      <Flex flexDirection="column" justifyContent="space-between">
        {/* 캠페인명 */}
        <Typography size={18} weight="semiBold">
          {name}
        </Typography>

        {/* 날짜 */}
        <Typography color={colorPalette.grey[800]} size={14}>
          {startDate} ~ {endDate}
        </Typography>

        {/* 목표금액 */}
        <Typography weight="medium" color={colorPalette.grey[800]}>
          목표 금액 :{' '}
          <span className={style.money2}>
            {formatAmount(targetFundraisingAmount)}
          </span>
        </Typography>

        {/* 모금금액 */}
        <Typography weight="medium" color={colorPalette.grey[800]}>
          모금 금액 :{' '}
          <span className={style.money}>
            {formatAmount(currentFundraisingAmount)}
          </span>
        </Typography>

        {/* 태그 */}
        <Flex gap={8} style={{ marginTop: '4px', alignItems: 'center' }}>
          <Box
            padding="5px 10px"
            backgroundColor={campaignStatusColor}
            className={style.tag}
          >
            {campaignStatus}
          </Box>
          <Box
            padding="5px 10px"
            backgroundColor={achievementStatusColor}
            className={style.tag}
          >
            {achievementStatus}
          </Box>
          {/* 삭제 */}
          <Box>
            <HiOutlineTrash
              size={20}
              color={colorPalette.grey[800]}
              onClick={handleDeleteClick}
            />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
