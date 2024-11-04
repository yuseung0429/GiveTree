'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TreeImg from '@/assets/images/tree/tree.png';
import * as styles from './tree.css';
import Message from '@/components/tree/Message';
import { MessageContent } from '@/components/tree/TreeSlider';

// const dataFetch = () =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve('a'), 1000);
//   });

const decorations = Array(7)
  .fill(null)
  .map((_, index) => `/images/treeObj${index + 1}.png`);

const decorationPositions = [
  { top: '18%', left: '41%' },
  { top: '36%', left: '30%' },
  { top: '36%', left: '54%' },
  { top: '52%', left: '20%' },
  { top: '50%', left: '42%' },
  { top: '51%', left: '64%' },
  { top: '70%', left: '12%' },
  { top: '66%', left: '31%' },
  { top: '66%', left: '53%' },
  { top: '70%', left: '73%' },
];

type TreeSliderProps = {
  messages: MessageContent[];
  isFlipping: boolean;
  showDecorations: boolean;
};

const Tree = ({ messages, isFlipping, showDecorations }: TreeSliderProps) => {
  const [selectedMessage, setSelectedMessage] = useState<MessageContent | null>(
    null
  );
  const [selectDecoration, setSelectDecoration] = useState<string>('');

  const handleDecorationClick = (
    message: MessageContent,
    decoration: string
  ) => {
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
          <Image
            key={index}
            src={decorations[index % decorations.length]}
            alt={`decoration ${index + 1}`}
            className={styles.decoration}
            style={decorationPositions[index]}
            onClick={() =>
              handleDecorationClick(
                message,
                decorations[index % decorations.length]
              )
            }
            width={60}
            height={60}
          />
        ))}

      {selectedMessage && (
        <Message
          message={selectedMessage}
          decoration={selectDecoration}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Tree;
