'use client';

import * as s from './Information.css';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { StaticImageData } from 'next/image';
import ProfileImageUploader from '@/components/myPage/Profile/ProfileImageUploader';
import { useActionState, useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import useDialog from '@/hooks/useDialog';
import modifyFoundation from '@/actions/member/modifyFoundation';

interface FoundationInfoProps {
  image: StaticImageData | string;
  name: string;
  introduction: string;
  corporateRegistrationNumber: string;
  phoneNumber: string;
  address: string;
}

export default function FoundationInfo({
  image,
  name,
  introduction,
  corporateRegistrationNumber,
  phoneNumber,
  address,
}: FoundationInfoProps) {
  const [newName, setNewName] = useState<string>(name);
  const [newIntroduction, setNewIntroduction] = useState<string>(introduction);
  const { alert } = useDialog();

  const [state, formAction] = useActionState(modifyFoundation, {});

  useEffect(() => {
    if (state.success) {
      alert('재단 정보를 수정했습니다.');
      return;
    }

    if (state.errors) {
      alert(state.message);
    }
  }, [state, alert]);

  return (
    <form action={formAction}>
      <Box className={s.profileConatainer}>
        <ProfileImageUploader name="profileImageUrl" defaultValue={image} />

        <div className={s.name}>
          <Typography as="h5" color={colorPalette.primary[700]}>
            재단 회원
          </Typography>
          <div className={s.inputBox}>
            <input
              type="text"
              name="name"
              style={{ textAlign: 'center' }}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={s.nameInput}
              placeholder={name}
            />
          </div>
        </div>

        <div className={s.info}>
          <Typography as="h3" weight="medium">
            사업자 등록번호
          </Typography>
          <Typography as="h4" weight="medium">
            {corporateRegistrationNumber}
          </Typography>
        </div>

        <div className={s.info}>
          <Typography as="h3" weight="medium">
            전화번호
          </Typography>
          <Typography as="h4" weight="medium">
            {phoneNumber}
          </Typography>
        </div>
        <div className={s.info}>
          <Typography as="h3" weight="medium">
            주소
          </Typography>
          <Typography as="h4" weight="medium">
            {address}
          </Typography>
        </div>
      </Box>
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: colorPalette.primary[50],
        }}
      ></div>
      <Box className={s.introduceBox}>
        <Typography as="h3" weight="medium" style={{ marginLeft: '0.75rem' }}>
          재단 소개
        </Typography>
        <textarea
          id="textArea"
          value={newIntroduction}
          name="introduction"
          onChange={(e) => setNewIntroduction(e.target.value)}
          placeholder={introduction}
          className={s.introduceInput}
          rows={6}
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
    </form>
  );
}
