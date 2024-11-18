import Image from 'next/image';

import { RecipeVariants } from '@vanilla-extract/recipes';

import * as s from './ProfileImage.css';

import { mergeClasses } from '@/utils/mergeClasses';

type ProfileImageVariants = NonNullable<RecipeVariants<typeof s.profileImage>>;

interface ProfileImageProps
  extends ProfileImageVariants,
    Omit<React.ComponentProps<'div'>, keyof ProfileImageVariants> {
  src?: string;
  borderColor?: string;
}

const ProfileImage = ({
  src,
  borderColor = 'transparent',
  size = 'md',
  className,
  style,
  ...props
}: ProfileImageProps) => {
  return (
    <div
      className={mergeClasses(s.profileImage({ size }), className)}
      style={{ boxShadow: `0 0 0 0.0625rem ${borderColor}`, ...style }}
      {...props}
    >
      <Image
        src={
          src ||
          'https://givetree-bucket.s3.amazonaws.com/271bd10c4b77c4668ccdfba4063d246f.webp'
        }
        alt="Profile"
        fill={true}
        sizes="4rem, 4rem"
      />
    </div>
  );
};

export default ProfileImage;
