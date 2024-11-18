import getFoundationOneTimeDonation from '@/api/donation/getFoundationOneTimeDonation';
import getFoundation from '@/api/member/getFoundation';
import Typography from '@/components/common/Typography';
import OneTimeGive from '@/components/myPage/Donation/Foundation/OneTime';
import RegularDelete from '@/components/myPage/GiveFoot/RegularDelete';
import { FoundationOneTimeDonation } from '@/types/donation/foundation/types';
import * as s from './[id].css';
import Flex from '@/components/common/Flex';
import colorPalette from '@/styles/tokens/colorPalette';

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const foundationId = (await params).id;
  const { name } = await getFoundation(foundationId);
  const foundationDonationAll = await getFoundationOneTimeDonation();
  const regularDonationInfo = foundationDonationAll.filter(
    (donation: FoundationOneTimeDonation) => {
      return (
        donation.foundationId === Number(foundationId) &&
        donation.donationType === 'REGULAR'
      );
    }
  );

  return (
    <>
      <Typography as="h3" style={{ padding: '1rem 1.25rem' }}>
        <b>{name}</b> 재단에 <b>{regularDonationInfo.length}회</b> 정기
        후원하였습니다.
      </Typography>

      {regularDonationInfo.length === 0 ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          style={{
            margin: '0 1.5rem',
            color: colorPalette.grey[500],
            minHeight: '150px',
            backgroundColor: colorPalette.secondary[50],
            borderRadius: '10px',
          }}
        >
          아직 정기 결제일이 되지 않았습니다.
        </Flex>
      ) : (
        regularDonationInfo.map(
          (donation: FoundationOneTimeDonation, index: number) => {
            <OneTimeGive key={index} donation={donation} />;
          }
        )
      )}
      <div className={s.DeleteButton}>
        <RegularDelete foundationId={foundationId} />
      </div>
    </>
  );
}
