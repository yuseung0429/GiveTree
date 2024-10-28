import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden'
});

export const treeImage = style({
  display: 'flex',
  width: '100%',
  maxWidth: '400px',
  height: '74vh',
  overflow: 'hidden',
  filter: 'drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.5))',
});
