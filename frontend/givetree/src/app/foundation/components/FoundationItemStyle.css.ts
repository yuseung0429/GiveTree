import { style } from '@vanilla-extract/css';
// import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  width: '100%',
  height: '70px',
  borderRadius: '2px',
  backgroundColor: 'white',
  padding: '10px',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '10px'
});

export const foundationLogo = style({
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  padding: '10px',
  flexShrink: '0',
  border: '1px solid grey'
});

export const btn = style({
  width: '30px',
  height: '30px',
  flexShrink: '0',
});

export const textbox = style({
  backgroundColor: 'red'
});

export const descript = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});