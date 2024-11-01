import Box from '@/components/common/Box';
import * as style from './FoundationItemStyle.css';
import Typography from '@/components/common/Typography';
import { MdNavigateNext } from 'react-icons/md';

type FoundationItemProps = {
  foundation: {
    id: number;
    name: string;
  };
  onClick: () => void;
};

export default function FoundationItem({
  foundation,
  onClick,
}: FoundationItemProps) {
  return (
    <Box className={style.container} onClick={onClick} role="button">
      <Box className={style.flexbox}>
        <div className={style.foundationLogo}></div>
        <Box className={style.textbox}>
          <Typography as="h4" weight="medium">
            {foundation.name}
          </Typography>
          <Typography weight="light" className={style.descript}>
            굿네이버스는 1991년 설립되어 국내, 북한
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
