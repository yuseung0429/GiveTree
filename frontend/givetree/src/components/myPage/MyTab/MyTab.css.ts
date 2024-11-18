import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const tab = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: '3.5rem',
  justifyContent: 'space-between',
  padding: '2rem',
  transition: 'background-color 0.2s ease',

  ':active': {
    backgroundColor: colorPalette.grey[100],
  },
});

export const IconBox = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem',
});
