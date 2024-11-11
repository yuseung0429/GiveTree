import Typography from '@/components/common/Typography';
import * as styles from './CampaignInfo.css';
import Image from 'next/image';
import colorPalette from '@/styles/tokens/colorPalette';

interface CampaignInfoProps {
  introduction: string;
  introduceImage: string[];
}

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
          <Image
            key={index}
            src={image}
            alt="introduce image"
            width={300}
            height={420}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignInfo;
