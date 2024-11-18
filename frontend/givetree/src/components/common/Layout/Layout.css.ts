import { globalStyle, style } from '@vanilla-extract/css';

export const layout = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#fff',
});

globalStyle(`${layout} > main`, {
  flex: '1 1 auto',
  position: 'relative',
  overflow: 'scroll',
  maxWidth: '100vw',
});

globalStyle(`${layout} > header`, {
  flex: '0 0 auto',
});

globalStyle(`${layout} > footer`, {
  flex: '0 0 auto',
});
