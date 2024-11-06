import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  zIndex: 100,
  padding: '20px',
  alignItems: 'flex-end',
});

export const modalContent = style({
  width: '100%',
  marginBottom: '60px',
});
