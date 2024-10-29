'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TreeImg from '@/assets/images/tree/tree9.png';
import * as styles from './tree.css';
import Message from '@/components/tree/Message';
import { MessageContent, TreeProps } from '@/components/tree/TreeSlider';

// const dataFetch = () =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve('a'), 1000);
//   });


const decorations = Array(7)
  .fill(null)
  .map((_, index) => `/images/treeObj${index + 1}.png`);

const decorationPositions = [
  { top: '20%', left: '42%' },
  { top: '36%', left: '32%' },
  { top: '36%', left: '56%' },
  { top: '50%', left: '20%' },
  { top: '50%', left: '44%' },
  { top: '52%', left: '65%' },
  { top: '68%', left: '10%' },
  { top: '66%', left: '32%' },
  { top: '66%', left: '54%' },
  { top: '69%', left: '73%' },
];

const Tree = ({ messages }: TreeProps) => {
  const [selectedMessage, setSelectedMessage] = useState<MessageContent | null>(null);
  const [selectDecoration, setSelectDecoration] = useState<string>('');

  const handleDecorationClick = (message: MessageContent, decoration: string) => {
    setSelectedMessage(message);
    setSelectDecoration(decoration);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <div className={styles.container}>
      <Image src={TreeImg} alt="tree Image" className={styles.treeImage} />
      {messages.map((message, index) => (
        <Image
          key={index}
          src={decorations[index % decorations.length]}
          alt={`decoration ${index + 1}`}
          className={styles.decoration}
          style={decorationPositions[index]}
          onClick={() => handleDecorationClick(message, decorations[index % decorations.length])}
          width={60}
          height={60}
        />
      ))}
      {selectedMessage && (
        <Message message={selectedMessage} decoration={selectDecoration} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Tree;
