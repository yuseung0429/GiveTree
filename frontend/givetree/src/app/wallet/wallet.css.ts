import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const grabox = style({
  background: `linear-gradient(to bottom, ${colorPalette.primary[300]} 0%, #F5F5F5 100%)`,
  height: '220px',
  width: '100%',
  padding: '20px',
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
