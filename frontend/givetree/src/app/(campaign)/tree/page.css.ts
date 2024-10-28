import { style } from '@vanilla-extract/css';

import treeBackground from '@/assets/images/tree/treeBackground.png';

export const background = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  width: '100%',
  height: '100%',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('${treeBackground.src}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: 0.75,
    zIndex: -1,
  },
});

export const teamText = style({
  marginTop: '30px',
  marginLeft: '1rem',
});

export const messageText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  marginTop: '5px',
});

export const treeImage = style({
  display: 'flex',
  justifyContent: 'center',
});
