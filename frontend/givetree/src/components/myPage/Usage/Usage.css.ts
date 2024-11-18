import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const usageBox = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '0.5rem 1rem 0.75rem',
  border: `1px solid ${colorPalette.grey[600]}`,
  borderRadius: '12px',
});

export const noneUsageBox = style({
  width: '98%',
  height: '105px',
  borderRadius: '12px',
  backgroundColor: colorPalette.secondary[50],
  padding: '0.75rem 1rem',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
