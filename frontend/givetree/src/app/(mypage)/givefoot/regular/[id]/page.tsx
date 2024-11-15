import getFoundationOneTimeDonation from '@/api/donation/getFoundationOneTimeDonation';
import getFoundation from '@/api/member/getFoundation';
import Typography from '@/components/common/Typography';
import OneTimeGive from '@/components/myPage/Donation/Foundation/OneTime';
import RegularDelete from '@/components/myPage/GiveFoot/RegularDelete';
import { FoundationOneTimeDonation } from '@/types/donation/foundation/types';
import * as s from "./[id].css";

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
      <Typography as="h3" style={{ padding: '1rem' }}>
        <b>{name}</b> 재단에 <b>{regularDonationInfo.length}회</b> 정기
        후원하였습니다.
      </Typography>

      {regularDonationInfo &&
        regularDonationInfo.map(
          (donation: FoundationOneTimeDonation, index: number) => {
            <OneTimeGive key={index} donation={donation} />;
          }
        )}
      <div className={s.DeleteButton}>
        <RegularDelete foundationId={foundationId}/>
      </div>
    </>
  );
}
