import Image from 'next/image';

import { MdNavigateNext } from 'react-icons/md';

import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';

import * as style from './FoundationItemStyle.css';

type FoundationItemProps = {
  foundation: {
    id: number;
    introduction: string;
    profileImageUrl: string;
    name: string;
  };
  onClick?: () => void;
};

export default function FoundationItem({
  foundation,
  onClick,
}: FoundationItemProps) {
  return (
    <Box
      className={style.container}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Box className={style.flexbox}>
        <div className={style.foundationLogo}>
          <Image src={foundation.profileImageUrl} alt="Profile" fill={true} />
        </div>
        <Box className={style.textbox}>
          <Typography as="h4" weight="medium">
            {foundation.name}
          </Typography>
          <Typography weight="light" className={style.descript}>
            {foundation.introduction}
          </Typography>
        </Box>
      </Box>

      {/* 버튼 */}
      <Box className={style.btn}>
        <MdNavigateNext size={30} color="grey" />
      </Box>
    </Box>
  );
}
