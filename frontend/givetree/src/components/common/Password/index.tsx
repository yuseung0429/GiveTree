'use client';

import { useCallback, useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import * as style from './Password.css';
import AppBar from '@/components/common/AppBar';
import Typography from '@/components/common/Typography';
import Flex from '@/components/common/Flex';
import colorPalette from '@/styles/tokens/colorPalette';
import { useRouter } from 'next/navigation';

interface PasswordProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (password: string) => Promise<{ error?: string }>;
}

export default function Password({
  title = '비밀번호 입력',
  subtitle = '비밀번호를 입력해주세요.',
  onSubmit,
}: PasswordProps) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [numbers, setNumbers] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (password.length === 6) {
      onSubmit?.(password).then((result) => {
        if (result?.error) {
          setError(result.error);
          setPassword('');
        }
      });
    }
  }, [password, onSubmit]);

  const shuffleNumbers = useCallback(() => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }, []);

  useEffect(() => {
    setNumbers(shuffleNumbers());
  }, [shuffleNumbers]);

  const handleNumberClick = (num: string) => {
    if (password.length < 6) {
      setPassword((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  const handleShuffle = () => {
    setNumbers(shuffleNumbers());
  };

  return (
    <Layout>
      <header style={{ backgroundColor: '#F5F5F5' }}>
        <AppBar title="" transparent onBackClick={() => router.back()} />
      </header>

      <main style={{ backgroundColor: '#F5F5F5' }}>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          className={style.container}
        >
          <Flex flexDirection="column" alignItems="center">
            <Typography
              color={colorPalette.grey[800]}
              size={24}
              weight="bold"
              className={style.title}
            >
              {title}
            </Typography>
            <Typography
              color={colorPalette.grey[600]}
              className={style.subtitle}
            >
              {subtitle}
            </Typography>

            <div className={style.passwordDisplay}>
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className={`${style.passwordDot} ${
                    i < password.length ? style.filledDot : ''
                  }`}
                />
              ))}
            </div>

            <Typography color={colorPalette.danger[400]} weight="medium">
              {error}
            </Typography>
          </Flex>

          <div className={style.numberPad}>
            {numbers.slice(0, 9).map((num) => (
              <button
                key={num}
                className={style.numberButton}
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </button>
            ))}
            <button
              className={style.actionButton}
              onClick={() => handleDelete()}
            >
              ←
            </button>
            <button
              className={style.numberButton}
              onClick={() => handleNumberClick(numbers[9])}
            >
              {numbers[9]}
            </button>
            <button className={style.actionButton} onClick={handleShuffle}>
              재배열
            </button>
          </div>
        </Flex>
      </main>
    </Layout>
  );
}
