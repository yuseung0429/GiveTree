import colorPalette from '@/styles/tokens/colorPalette';
import { style, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const background = style({
  background: `linear-gradient(to bottom, ${colorPalette.primary[300]} 0%, #F5F5F5 100%)`,
  height: '240px',
  width: '100%',
  padding: '1.25rem',
});

export const walletcontainer = style({
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  width: '100%',
  height: '100%',
  borderRadius: '10px',
  padding: '15px',
});

export const listcontainer = style({
  padding: '20px',
});

export const allbtn = style({
  display: 'flex',
  alignItems: 'center',
  color: colorPalette.grey[800],
});

export const spinningRefresh = style({
  animation: `${spin} 1s linear infinite`,
});
