import { globalStyle } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

globalStyle('*', {
  margin: '0',
  boxSizing: 'border-box',
  overflow: 'overlay',
  fontFamily: 'inherit',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('*::-webkit-scrollbar', {
  width: '0',
  height: '0',
});

globalStyle('body', {
  color: colorPalette.text[900],
});

globalStyle('svg', {
  display: 'block',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'inherit',
});
