
import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100vw',
  height: '3.5rem',
  alignItems: 'center',
  padding: '0 20px',
  backgroundColor: colorPalette.primary[300],
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
});

export const rightSection = style({
  display: 'flex',
  alignItems: 'center',
});
