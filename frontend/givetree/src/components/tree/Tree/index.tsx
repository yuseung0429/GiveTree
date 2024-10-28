import React from 'react';
import Image from 'next/image';
import TreeImg from '@/assets/images/tree/tree.png';
import * as style from './tree.css';

const dataFetch = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('a'), 1000);
  });

const Tree = async () => {
  await dataFetch();

  return (
    <div className={style.container}>
      <Image src={TreeImg} alt="tree Image" className={style.treeImage} />
    </div>
  );
};
export default Tree;
