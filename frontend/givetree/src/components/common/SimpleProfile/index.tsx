'use client';

import useGetMember from '@/api/member/useGetMember';

import typography from '@/styles/tokens/typography';
import colorPalette from '@/styles/tokens/colorPalette';

import Flex from '@/components/common/Flex';
import ProfileImage from '@/components/common/ProfileImage';
import Typography from '@/components/common/Typography';

interface SimpleProfileProps {
  id: number;
  size: 'sm' | 'md';
}

interface Variant {
  gap: string;
  profileImageSize: 'sm' | 'md';
  nameSize: 'xs' | 'lg';
}

const variants: Record<SimpleProfileProps['size'], Variant> = {
  sm: {
    gap: '0.375rem',
    profileImageSize: 'sm',
    nameSize: 'xs',
  },

  md: {
    gap: '1rem',
    profileImageSize: 'md',
    nameSize: 'lg',
  },
};

const SimpleProfile = ({ id, size }: SimpleProfileProps) => {
  const data = useGetMember(id);

  return (
    <Flex alignItems="center" gap={variants[size].gap}>
      <div style={{ flex: '0 0 auto' }}>
        <ProfileImage
          src={data?.profileImageUrl}
          borderColor={colorPalette.grey[600]}
          size={variants[size].profileImageSize}
        />
      </div>
      <Flex>
        <Typography
          size={typography.size[variants[size].nameSize]}
          weight="semiBold"
        >
          {data?.name}
        </Typography>
      </Flex>
    </Flex>
  );
};

export default SimpleProfile;
