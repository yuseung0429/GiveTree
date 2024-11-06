import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100%',
  background: '#F5F5F5',
  padding: '20px 10px',
});

export const searchSection = style({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  flexShrink: '0',
});

export const resultCount = style({
  flexShrink: '0',
});

export const searchbox = style({
  flex: 1,
  overflowY: 'auto',
});

export const noResult = style({
  padding: '40px 20px',
  textAlign: 'center',
});
