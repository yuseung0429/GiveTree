import { globalStyle } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

globalStyle('*', {
  margin: '0',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  WebkitTapHighlightColor: 'transparent',
  overscrollBehavior: 'none',
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
