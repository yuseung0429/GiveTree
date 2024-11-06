'use client';

import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as s from './EditUserName.css';
import { useState } from 'react';

interface EditUserNameProps {
  email: string;
}

export default function EditUserName({ email }: EditUserNameProps) {
  const [name, setName] = useState<string>('눈사람');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className={s.name}>
        <Typography as="h5" color={colorPalette.primary[700]}>
          GIVE 회원
        </Typography>
        <div className={s.inputBox}>
          <input
            type="text"
            style={{ textAlign: 'center' }}
            value={name}
            onChange={handleNameChange}
            className={s.nameInput}
            placeholder={name}
          />
        </div>
      </div>

      <div className={s.email}>
        <Typography as="h3" weight="medium">
          이메일
        </Typography>
        <Typography as="h3" weight="medium">
          {email}
        </Typography>
      </div>

      <div className={s.modifyButton}>
        <Button variant="outlined" fullWidth>
          수정하기
        </Button>
      </div>
    </>
  );
}
