import { style } from '@vanilla-extract/css';

export const noItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '0.5rem',
  height: '100%',
});
