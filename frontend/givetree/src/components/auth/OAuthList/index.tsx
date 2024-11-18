import Link from 'next/link';

import kakao from '@/assets/images/oauth/kakao.png';
import naver from '@/assets/images/oauth/naver.png';
import google from '@/assets/images/oauth/google.png';

import OAuthButton from '@/components/auth/OAuthButton';
import Flex from '@/components/common/Flex';

import color from '@/styles/tokens/color';

const OAuthList = () => {
  return (
    <Flex flexDirection="column" gap="1rem">
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`}
        prefetch={false}
      >
        <OAuthButton
          borderColor="#fee500"
          backgroundColor="#fee500"
          color="#000"
          icon={kakao}
        >
          카카오 계정으로 시작하기
        </OAuthButton>
      </Link>

      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/naver`}
        prefetch={false}
      >
        <OAuthButton
          borderColor="#03c75a"
          backgroundColor="#03c75a"
          color="#fff"
          icon={naver}
        >
          네이버 계정으로 시작하기
        </OAuthButton>
      </Link>

      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`}
        prefetch={false}
      >
        <OAuthButton
          borderColor={color.grey[600]}
          backgroundColor="#fff"
          color="#000"
          icon={google}
        >
          Google 계정으로 시작하기
        </OAuthButton>
      </Link>
    </Flex>
  );
};

export default OAuthList;
