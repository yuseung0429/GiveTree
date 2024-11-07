'use client';

import Typography from '@/components/common/Typography';
import { useState } from 'react';
import * as s from './Introduce.css';
import Box from '@/components/common/Box';
import colorPalette from '@/styles/tokens/colorPalette';
import Button from '@/components/common/Button';

export default function FoundationIntroduce() {
  const [introduction, setIntroduction] = useState<string>('');

  const handleIntroduceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
  };

  return (
    <>
      <Box className={s.introduceBox}>
        <Typography as="h3" weight="medium" style={{ marginLeft: '0.75rem' }}>
          재단 소개
        </Typography>
        <textarea
          id="textArea"
          value={introduction}
          onChange={handleIntroduceChange}
          placeholder="재단을 소개해주세요."
          className={s.introduceInput}
          rows={5}
          cols={30}
        />
      </Box>

      <div
        style={{
          width: '100%',
          height: '10px',
          margin: '0',
          backgroundColor: colorPalette.primary[50],
        }}
      ></div>

      <Box className={s.subContainer}>
        <div className={s.modifyButton}>
          <Button variant="outlined" fullWidth>
            수정하기
          </Button>
        </div>
      </Box>
    </>
  );
}
