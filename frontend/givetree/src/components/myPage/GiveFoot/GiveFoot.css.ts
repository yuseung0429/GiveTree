import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const footBox = style({
  backgroundColor: colorPalette.primary[50],
  borderRadius: '10px',
  width: '100%',
  height: '100%',
  padding: '1rem 1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

export const titleBox = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5rem',
});

export const contentBox = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
