import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const grabox = style({
  background: `linear-gradient(to bottom, ${colorPalette.primary[300]}, ${colorPalette.primary[100]})`,
  height: '190px',
  width: '100%',
  padding: '1.25rem',
});

export const walletcontainer = style({
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '10px',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '1rem 0.75rem',
  boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.25)',
  scrollSnapAlign: 'start',
  flexShrink: '0',
  margin: '0.75rem 0.5rem 0.5rem 0',
});

export const sliderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  marginLeft: '0.25em',
  paddingRight: '0.5rem',
  gap: '1rem',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  scrollSnapType: 'x mandatory',
});

export const dotsContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0.5rem',
});

export const dot = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  margin: '0 5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
});
