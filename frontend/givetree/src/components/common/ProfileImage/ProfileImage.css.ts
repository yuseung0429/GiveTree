import { recipe } from '@vanilla-extract/recipes';

export const profileImage = recipe({
  base: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '50%',
  },

  variants: {
    size: {
      sm: {
        width: '2rem',
        height: '2rem',
      },

      md: {
        width: '3rem',
        height: '3rem',
      },

      lg: {
        width: '4rem',
        height: '4rem',
      },
    },
  },
});
