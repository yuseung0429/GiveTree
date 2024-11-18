import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const box = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginTop: '1rem',
  padding: '0.5rem 1rem 0.75rem',
  border: `1px solid ${colorPalette.grey[600]}`,
  borderRadius: '12px',
});

export const title = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.75rem',
  alignItems: 'center',
  marginTop: '0.25rem'
});
