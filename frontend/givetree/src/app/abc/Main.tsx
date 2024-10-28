import React from 'react';
import * as style from './Main.css';

const dataFetch = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('a'), 1000);
  });

const Main = async () => {
  await dataFetch();

  return (
    <div className={style.mainStyle}>
      여기는 abc로 들어가면 보이게 될거야
    </div>
  );
};
export default Main;
