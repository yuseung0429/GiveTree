import Box from '@/components/common/Box';
import * as style from '../donation.css';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import getSessionMember from '@/api/member/getSessionMember';
import { getRegisteredAccount } from '@/api/account/getRegisteredAccount';
import getFoundation from '@/api/member/getFoundation';
import Flex from '@/components/common/Flex';
import Account from '@/components/common/Account';
import FoundationRegularDonation from '@/components/foundation/donation/FoundationRegularDonation';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const foundationId = (await params).id;
  const { role } = await getSessionMember();
  const response = await getRegisteredAccount();
  const registeredAccount = response.ok && response.data ? response.data : null;
  const { name, profileImageUrl } = await getFoundation(foundationId);

  const calculateMonth = () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if (currentDate > 26) {
      if (currentMonth + 1 > 12) {
        return 1;
      } else {
        return currentMonth + 1;
      }
    } else {
      return currentMonth;
    }
  };

  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <FoundationRegularDonation
        name={name}
        image={profileImageUrl}
        id={foundationId}
        isAccount={registeredAccount}
        role={role}
      />

      <Box
        as="section"
        marginBottom="15px"
        backgroundColor="white"
        padding="1.5rem 1rem"
      >
        <Typography
          as="h3"
          weight="medium"
          style={{ marginLeft: '0.5rem', marginBottom: '0.5rem' }}
        >
          결제일
        </Typography>
        <Box padding="0.5rem" style={{ textAlign: 'center' }}>
          <Typography className={style.accountInfo} weight="semiBold" size={18}>
            매월 26일 (다음 결제일 : {calculateMonth()}월 26일)
          </Typography>
          <Typography color={colorPalette.primary[400]} weight="medium">
            이번 달 정기후원 결제일이 지났다면
            <br />
            다음 달부터 결제가 진행됩니다.
          </Typography>
        </Box>
      </Box>

      <Box
        as="section"
        marginBottom="15px"
        backgroundColor="white"
        padding="1.5rem 1rem"
      >
        <Typography as="h3" weight="medium" style={{ marginLeft: '0.5rem' }}>
          결제수단
        </Typography>
        <Flex justifyContent="center" style={{ marginBottom: '0.5rem' }}>
          <Account registeredAccount={registeredAccount} />
        </Flex>
      </Box>
    </div>
  );
}
