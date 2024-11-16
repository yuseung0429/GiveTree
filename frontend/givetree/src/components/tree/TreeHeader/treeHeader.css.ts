import { style } from '@vanilla-extract/css';

export const messageText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  marginTop: '0.25rem',
});

export const moreButton = style({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '0.5rem 1rem',
});
