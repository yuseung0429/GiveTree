import { style } from '@vanilla-extract/css';

// import colorPalette from '@/styles/tokens/colorPalette';

export const mainBg = style({
  backgroundColor: '#F5F5F5',
  minHeight:'100%',
});

export const listBox = style({
  padding: '10px',
  margin: '20px 0'
});

export const TabBox = style({
  width: '125px',
  height: '50px',
  backgroundColor: 'white'
});

export const tabContainer = style({
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  scrollbarWidth: 'none',  // Firefox
  msOverflowStyle: 'none', // IE/Edge

  '::-webkit-scrollbar': { // Chrome, Safari
    display: 'none',
  },
});

export const tabButton = style({
  minWidth: '125px',
  height: '55px',
  backgroundColor: 'white',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  textAlign: 'center',
  padding: '10px 0',
  fontWeight: '500',
});