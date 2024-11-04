import Typography from '@/components/common/Typography';
import * as styles from './CampaignInfo.css';
import Image from 'next/image';

interface CampaignInfoProps {
  introduction: string;
  introduceImage: string;
}

const CampaignInfo = ({ introduction, introduceImage }: CampaignInfoProps) => {
  return (
    <div>
      <Typography as="h4" weight="semiBold" className={styles.introduction}>
        {introduction}
      </Typography>
      <div className={styles.introduceImage}>
        <Image
          src={introduceImage}
          alt="introduce image"
          width={300}
          height={420}
        />
      </div>
    </div>
  );
};

export default CampaignInfo;
