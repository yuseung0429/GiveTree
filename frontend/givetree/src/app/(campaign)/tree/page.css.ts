import { style } from '@vanilla-extract/css';

export const background = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  backgroundImage: `url('/images/background.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export const teamText = style({
  marginTop: '1rem',
  marginLeft: '1rem',
});

export const messageText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  marginTop: '0.25rem',
});

export const treeImage = style({
  display: 'flex',
  justifyContent: 'center',
});

export const moreButton = style({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '0.5rem 1rem',
});