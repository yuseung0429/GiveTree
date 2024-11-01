import { globalStyle } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

globalStyle('*', {
  margin: '0',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  WebkitTapHighlightColor: 'transparent',
  boxSizing: 'border-box',
});

globalStyle('body', {
  color: colorPalette.text[900],
});

globalStyle('svg', {
  display: 'block',
});
