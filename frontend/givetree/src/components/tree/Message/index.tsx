import React from 'react';
import Image from 'next/image';
import * as styles from './message.css';
import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Box from '@/components/common/Box';
import { MessageContent } from '@/components/tree/TreeSlider';

type MessageProps = {
  message: MessageContent;
  decoration: string;
  onClose: () => void;
};

const Message = ({ message, decoration, onClose }: MessageProps) => {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <Image
          src={decoration}
          alt="decoration"
          width={90}
          height={90}
          className={styles.decorationImg}
        />
        <Box className={styles.messageTextContainer}>
          <Typography as="h4" color={colorPalette.text[900]} weight="semiBold">
            {message.message}
          </Typography>

          <Typography as="p" color={colorPalette.secondary[400]} weight="bold">
            from. {message.from}
          </Typography>
        </Box>

        <Button onClick={onClose} fullWidth={true}>
          닫기
        </Button>
      </div>
    </>
  );
};

export default Message;
