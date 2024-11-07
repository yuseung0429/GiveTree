import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const box = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  width: '100%',
  marginTop: '1rem',
  padding: '0.75rem 1rem',
  border: `1px solid ${colorPalette.grey[600]}`,
  borderRadius: '12px',
});

export const title = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.75rem',
  alignItems: 'center',
});
