import { ReactNode } from 'react';

import * as s from './OAuthButton.css';

import typography from '@/styles/tokens/typography';

import Image, { StaticImageData } from 'next/image';
import Typography from '@/components/common/Typography';

interface OAuthButtonProps {
  children: ReactNode;
  borderColor: string;
  backgroundColor: string;
  color: string;
  icon: StaticImageData;
}

const OAuthButton = ({
  children,
  borderColor,
  backgroundColor,
  color,
  icon,
}: OAuthButtonProps) => {
  return (
    <button
      className={s.button}
      style={{ borderColor, backgroundColor, color }}
    >
      <Image
        alt="OAuth Icon"
        src={icon.src}
        width={27}
        height={28}
        className={s.icon}
      />
      <Typography size={typography.size.md} weight="medium">
        {children}
      </Typography>
    </button>
  );
};

export default OAuthButton;
