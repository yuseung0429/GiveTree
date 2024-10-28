import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden'
});

export const treeImage = style({
  // paddingBottom: '50px',
  display: 'flex',
  width: '100%',
  maxWidth: '500px',
  height: '90vh',
  overflow: 'hidden',
  filter: 'drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.5))',
})
