import { style } from '@vanilla-extract/css';

export const giveButton = style({
  position: 'fixed',
  bottom: '50px',
  left: '0',
  width: '100%',
  padding: '1rem',
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
