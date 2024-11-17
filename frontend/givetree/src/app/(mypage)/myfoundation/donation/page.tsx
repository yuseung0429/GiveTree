import getCampaignDonationDetail from '@/api/donation/getCampaignDonationDetail';
import getCampaignStatistic from '@/api/donation/getCampaignStatistic';
import getDonationDetail, {
  DonationDetailItem,
} from '@/api/donation/getDonationDetail';
import getFoundationStatistic, {
  FoundationStatistic,
} from '@/api/donation/getFoundationStatistic';
import getFoundationCampaign from '@/api/foundation/getFoundationCampaign';

import getSessionFoundation from '@/api/member/getSessionFoundation';
import DonationTab from '@/components/myPage/Myfoundation/Donation/DonationTab';

export default async function DonationDetail() {
  const { id: foundationId, name } = await getSessionFoundation();
  const year = new Date().getFullYear();
  const campaigns = await getFoundationCampaign({ foundationName: name });

  const campaignStatistics = await Promise.all(
    campaigns.map(async (campaign) => {
      const { id: campaignId } = campaign;
      const statistics = await getCampaignStatistic(campaignId);
      return statistics;
    })
  );

  const campaignDonation = await Promise.all(
    campaigns.map(async (campaign) => {
      const { id: campaignId } = campaign;
      const donatin = await getCampaignDonationDetail(campaignId);
      return donatin;
    })
  );

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // YYYY-MM-DD 형식으로 반환
  };

  const getMonthlyStatistics = async (foundationId: number, year: number) => {
    const monthlyGiveFoot: FoundationStatistic[][] = [];

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1); // 해당 월의 1일
      const endDate = new Date(year, month + 1, 0); // 해당 월의 마지막 일

      const startDateString = formatDate(startDate); // YYYY-MM-DD 포맷
      const endDateString = formatDate(endDate); // YYYY-MM-DD 포맷

      const statistics = await getFoundationStatistic(
        { 'start-date': startDateString, 'end-date': endDateString },
        foundationId
      );

      monthlyGiveFoot.push([statistics]);
    }

    return monthlyGiveFoot;
  };

  const getMonthlyDonationDetail = async (
    foundationId: number,
    year: number
  ) => {
    const monthlyDonation: DonationDetailItem[][] = [];

    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1); // 해당 월의 1일
      const endDate = new Date(year, month + 1, 0); // 해당 월의 마지막 일

      const startDateString = formatDate(startDate); // YYYY-MM-DD 포맷
      const endDateString = formatDate(endDate); // YYYY-MM-DD 포맷

      const donationDetail = await getDonationDetail(
        { 'start-date': startDateString, 'end-date': endDateString },
        foundationId
      );

      monthlyDonation.push(donationDetail);
    }

    return monthlyDonation;
  };

  const statistics = await getMonthlyStatistics(foundationId, year);
  const donationDetail = await getMonthlyDonationDetail(foundationId, year);

  return (
    <div>
      <DonationTab
        statistics={statistics}
        donationDetail={donationDetail}
        campaigns={campaigns}
        campaignStatistics={campaignStatistics}
        campaignDonation={campaignDonation}
      />
    </div>
  );
}
