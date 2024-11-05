import { style } from '@vanilla-extract/css';

export const name = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.25rem',
  marginTop: '75px',
});

export const giveMoney = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '1.5rem 2.75rem',
});

export const footButton = style({
  width: '100%',
  padding: '0 2rem 1.5rem',
});
