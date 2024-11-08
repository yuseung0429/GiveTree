import { style } from '@vanilla-extract/css';

// import colorPalette from '@/styles/tokens/colorPalette';

export const mainBg = style({
  backgroundColor: '#F5F5F5',
  minHeight: '100%',
});

export const listBox = style({
  padding: '1rem',
});

export const TabBox = style({
  width: '120px',
  height: '50px',
  backgroundColor: 'white',
});

export const tabContainer = style({
  width: '100%',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE/Edge

  '::-webkit-scrollbar': {
    // Chrome, Safari
    display: 'none',
  },
  backgroundColor: 'white',
});
