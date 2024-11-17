import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const usageBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  width: '100%',
  padding: '0.75rem 1rem',
  border: `1px solid ${colorPalette.grey[600]}`,
  borderRadius: '12px',
});

export const noneUsageBox = style({
  width: '98%',
  height: '100px',
  borderRadius: '12px',
  backgroundColor: colorPalette.secondary[50],
  padding: '0.75rem 1rem',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});