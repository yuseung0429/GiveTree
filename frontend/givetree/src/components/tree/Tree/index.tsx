'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TreeImg from '@/assets/images/tree/tree.png';
import * as styles from './tree.css';
import { Message } from '@/types/tree/types';
import MessageItem from '@/components/tree/MessageItem';
import Typography from '@/components/common/Typography';

const decorations = Array(7)
  .fill(null)
  .map((_, index) => `/images/treeObj${index + 1}.png`);

const decorationPositions = [
  { top: '23%', left: '50%' },
  { top: '40%', left: '38%' },
  { top: '40%', left: '62%' },
  { top: '56%', left: '26%' },
  { top: '55%', left: '50%' },
  { top: '56%', left: '74%' },
  { top: '73%', left: '18%' },
  { top: '71%', left: '38%' },
  { top: '71%', left: '62%' },
  { top: '73%', left: '82%' },
];

type TreeSliderProps = {
  messages: Message[];
  isFlipping: boolean;
  showDecorations: boolean;
};

const Tree = ({ messages, isFlipping, showDecorations }: TreeSliderProps) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [selectDecoration, setSelectDecoration] = useState<string>('');

  const handleDecorationClick = (message: Message, decoration: string) => {
    setSelectedMessage(message);
    setSelectDecoration(decoration);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.treeImage} ${isFlipping ? styles.flip : ''}`}>
        <Image src={TreeImg} alt="tree Image" className={styles.treeImage} />
      </div>
      {showDecorations &&
        messages.map((message, index) => (
          <div
            key={index}
            style={decorationPositions[index]}
            className={styles.decorationContainer}
          >
            <Image
              src={decorations[index % decorations.length]}
              alt={`decoration ${index + 1}`}
              className={styles.decoration}
              onClick={() =>
                handleDecorationClick(
                  message,
                  decorations[index % decorations.length]
                )
              }
              width={58}
              height={58}
            />
            <Typography className={styles.messageName}>
              {message.name}
            </Typography>
          </div>
        ))}

      {selectedMessage && (
        <MessageItem
          message={selectedMessage}
          decoration={selectDecoration}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Tree;
