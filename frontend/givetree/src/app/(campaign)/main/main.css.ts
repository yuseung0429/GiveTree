import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  height: '100%',
  backgroundColor: colorPalette.primary[300],
});

export const mainContainer = style({
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  padding: '0.75rem',
  height: '100%',
  backgroundColor: 'white',
});

export const slideContainer = style({
  display: 'flex',
  marginLeft: '0.5em',
  paddingRight: '0.5rem',
  gap: '1rem',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  flexShrink: '0',
  scrollSnapType: 'x mandatory',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const sectionTitle = style({
  margin: '0.5rem 1rem',
  color: colorPalette.text[800],
  fontWeight: 'bold',
});
