import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'calc(100vw - 2rem)',
  height: '50vh',
  padding: '0.75rem',
  border: `0.0625rem solid ${colorPalette.grey[400]}`,
  borderRadius: '0.25rem',
  backgroundColor: colorPalette.grey[100],
});

export const searchContainer = style({
  display: 'flex',
  gap: '0.5rem',
  marginBottom: '1rem',
});

export const searchResult = style({
  overflow: 'auto',
});
