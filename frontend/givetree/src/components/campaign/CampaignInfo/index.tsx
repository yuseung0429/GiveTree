import Typography from '@/components/common/Typography';
import * as styles from './CampaignInfo.css';
// import Image from 'next/image';
import colorPalette from '@/styles/tokens/colorPalette';

interface CampaignInfoProps {
  introduction: string;
  introduceImage: string[];
}

/* eslint-disable @next/next/no-img-element */
const CampaignInfo = ({ introduction, introduceImage }: CampaignInfoProps) => {
  return (
    <div>
      <Typography
        as="h4"
        weight="medium"
        className={styles.introduction}
        color={colorPalette.text[900]}
      >
        {introduction}
      </Typography>
      <div className={styles.introduceImage}>
        {introduceImage.map((image, index) => (
          <img
            src={image}
            alt="introduce image"
            key={index}
            style={{ width: '90%' }}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignInfo;
