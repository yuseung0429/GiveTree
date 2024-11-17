import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import DonationUsage from '@/components/myPage/DonationUsage';
import * as s from './usage.css';
import getFoundationDonation from '@/api/donation/getFoundationDonaion';
import getDonationExpense from '@/api/donation/getDonationExpense';
import NoneDonation from '@/components/myPage/DonationUsage/NoneDonation';

export default async function DonationUsagePage() {
  const foundations = await getFoundationDonation();

  const donationExpenses = await Promise.all(
    foundations.map(async (foundation) => {
      const { foundationId } = foundation;
      const expenses = await getDonationExpense({ own: true }, foundationId);
      return expenses;
    })
  );

  return (
    <>
      <Box className={s.grabox}>
        <Typography
          as="h3"
          weight="medium"
          color="#fff"
          style={{ marginLeft: '0.5rem' }}
        >
          내가 후원한 재단
        </Typography>
        {foundations.length !== 0 ? (
          <DonationUsage
            foundations={foundations}
            donationExpenses={donationExpenses}
          />
        ) : (
          <NoneDonation />
        )}
      </Box>
    </>
  );
}
