import { globalStyle, style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

globalStyle(`${layout} > main`, {
  flex: '1 1 auto',
  overflowY: 'scroll',
});
