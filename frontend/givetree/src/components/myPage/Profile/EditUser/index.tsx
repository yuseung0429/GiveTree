'use client';

import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import * as s from './EditUser.css';
// import * as styles from '@/components/myPage/Profile/Profile.css';
import { useActionState, useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
// import Box from '@/components/common/Box';
// import { HiOutlinePlusCircle } from 'react-icons/hi2';
import ProfileImageUploader from '@/components/myPage/Profile/ProfileImageUploader';
import modifyMember from '@/actions/member/modifyMember';
import useDialog from '@/hooks/useDialog';

interface EditUserNameProps {
  name: string;
  email: string;
  image: StaticImageData | string;
}

export default function EditUser({ name, email, image }: EditUserNameProps) {
  const [newName, setNewName] = useState<string>(name);
  const { alert } = useDialog();

  const [state, formAction] = useActionState(modifyMember, {});

  useEffect(() => {
    if (state.success) {
      alert('회원 정보를 수정했습니다.');
      return;
    }

    if (state.errors) {
      alert(state.message);
    }
  }, [state, alert]);

  return (
    <>
      <form className={s.profileConatainer} action={formAction}>
        <ProfileImageUploader name="profileImageUrl" defaultValue={image} />

        <div className={s.name}>
          <Typography as="h5" color={colorPalette.primary[700]}>
            GIVE 회원
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
      </form>
    </>
  );
}
