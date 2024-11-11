import colorPalette from '@/styles/tokens/colorPalette';
import { keyframes, style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
});

export const fixedContainer = style({
  position: 'absolute',
  width: '100%',
  height: '65%',
  maxHeight: '580px',
  backgroundColor: '#F5F5F5',
  bottom: '0',
  borderRadius: '20px 20px 0 0',
  padding: '10px',
});

export const topLine = style({
  backgroundColor: colorPalette.grey[500],
  margin: '0 auto',
  width: '50px',
  height: '3px',
  borderRadius: '3px',
  marginBottom: '10px',
  flexShrink: '0',
});

export const selectbox = style({
  overflowY: 'scroll',
  height: 'calc(100% - 75px)',
  padding: '20px 30px',
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-track': {
    background: colorPalette.grey[200],
  },
  '::-webkit-scrollbar-thumb': {
    background: colorPalette.grey[400],
    borderRadius: '4px',
  },
});

export const btn = style({
  position: 'absolute',
  bottom: '10px',
  width: 'calc(100% - 20px)',
  flexShrink: '0',
  fontWeight: '500',
});

export const itemContainer = style({
  height: '35px',
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: colorPalette.grey[100],
  },
});

const fadeInAni = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const slideUpAni = keyframes({
  '0%': { transform: 'translateY(100%)' },
  '100%': { transform: 'translateY(0)' },
});

const slideDownAni = keyframes({
  '0%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(100%)' },
});

export const fadeIn = style({
  animation: `${fadeInAni} 0.3s ease-in-out`,
});

export const slideUp = style({
  animation: `${slideUpAni} 0.3s ease-in-out`,
});

export const slideDown = style({
  animation: `${slideDownAni} 0.3s ease-in-out`,
});
