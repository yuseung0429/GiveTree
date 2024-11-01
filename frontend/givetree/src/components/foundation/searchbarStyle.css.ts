import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
});

export const searchInput = style({
  flexGrow: '1',
  height:'50px',
  outline: 'none',
  border: `2px solid ${colorPalette.primary[50]}`,
  borderRadius: '5px',
  padding: '0px 10px',
  color: colorPalette.text[200],
});


export const searchBtn = style({
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: colorPalette.primary[300],
  color: 'white',
  cursor:'pointer',
  height: '50px',
  width: '50px'
});
