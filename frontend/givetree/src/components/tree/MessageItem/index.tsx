import React from 'react';
import Image from 'next/image';
import * as styles from './messageItem.css';
import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Box from '@/components/common/Box';
import { Message } from '@/types/tree/types';

type MessageProps = {
  message: Message;
  decoration: string;
  onClose: () => void;
};

const MessageItem = ({ message, decoration, onClose }: MessageProps) => {
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
          <Typography as="h4" color={colorPalette.text[900]} weight="medium">
            {message.message}
          </Typography>

          <Typography
            as="p"
            color={colorPalette.secondary[400]}
            weight="semiBold"
          >
            from. {message.name}
          </Typography>
        </Box>

        <Button onClick={onClose} fullWidth={true}>
          닫기
        </Button>
      </div>
    </>
  );
};

export default MessageItem;
