import { style } from '@vanilla-extract/css';

export const tab = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
});

export const IconBox = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
});
