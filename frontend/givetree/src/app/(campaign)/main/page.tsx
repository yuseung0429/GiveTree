import * as styles from './main.css';
import CampaignCard from '@/components/campaign/Main/CapaignCard';
import SearchBar from '@/components/campaign/Main/SearchBar';

const campaigns = [
  {
    title: '희망 나눔 캠페인',
    foundation: '사랑의 열매',
    currentAmount: '5400000',
    goalAmount: '15000000',
    progress: '36',
    imageUrl: '/images/campaign/poster.png',
    introduceImage: '/images/campaign/introducePoster.png',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    introduction: '어려운 이웃에게 희망을 전달하는 사랑의 열매 캠페인입니다.',
  },
  {
    title: '미래 꿈나무 지원 캠페인',
    foundation: '꿈나무 재단',
    currentAmount: '12000000',
    goalAmount: '20000000',
    progress: '60',
    imageUrl: '/images/campaign/poster2.png',
    introduceImage: '/images/campaign/introducePoster.png',
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    introduction:
      '미래를 이끌어 갈 아이들에게 더 나은 교육과 환경을 지원합니다.',
  },
  {
    title: '환경 보호 캠페인',
    foundation: '그린피스',
    currentAmount: '7500000',
    goalAmount: '10000000',
    progress: '75',
    imageUrl: '/images/campaign/poster2.png',
    introduceImage: '/images/campaign/introducePoster.png',
    startDate: '2024-05-01',
    endDate: '2024-11-03',
    introduction: '지구 환경을 보호하고 지속 가능한 미래를 위해 함께해 주세요.',
  },
  {
    title: '동물 보호 캠페인',
    foundation: '동물사랑 협회',
    currentAmount: '3000000',
    goalAmount: '5000000',
    progress: '60',
    imageUrl: '/images/campaign/poster.png',
    introduceImage: '/images/campaign/introducePoster.png',
    startDate: '2024-06-15',
    endDate: '2024-11-10',
    introduction: '위기에 처한 동물들을 보호하고 돌보는 캠페인입니다.',
  },
];

const today = new Date();
const twoWeeksLater = new Date(today);
twoWeeksLater.setDate(today.getDate() + 14);

const endingSoonCampaigns = campaigns.filter(campaign => {
  const endDate = new Date(campaign.endDate);
  return endDate <= twoWeeksLater && endDate >= today;
});

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <SearchBar />
      <div className={styles.mainContainer}>

        <h3 className={styles.sectionTitle}>진행 중인 캠페인</h3>
        <div className={styles.slideContainer}>
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              title={campaign.title}
              foundation={campaign.foundation}
              progress={parseInt(campaign.progress)}
              currentAmount={parseInt(campaign.currentAmount)}
              goalAmount={parseInt(campaign.goalAmount)}
              imageUrl={campaign.imageUrl}
            />
          ))}
        </div>

        <div style={{ height: '20px' }}></div>

        <h3 className={styles.sectionTitle}>종료 임박 캠페인</h3>
        <div className={styles.slideContainer}>
          {endingSoonCampaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              title={campaign.title}
              foundation={campaign.foundation}
              progress={parseInt(campaign.progress)}
              currentAmount={parseInt(campaign.currentAmount)}
              goalAmount={parseInt(campaign.goalAmount)}
              imageUrl={campaign.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
