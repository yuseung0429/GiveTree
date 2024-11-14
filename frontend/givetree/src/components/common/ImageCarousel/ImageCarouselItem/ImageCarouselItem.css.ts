import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  flexShrink: '0',
  position: 'relative',
  width: '100%',
  height: '100%',
  scrollSnapAlign: 'center',
});

export const image = style({
  maxHeight: '100%',
  maxWidth: '100%',
});
