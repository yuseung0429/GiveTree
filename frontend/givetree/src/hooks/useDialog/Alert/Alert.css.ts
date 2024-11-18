import { style } from '@vanilla-extract/css';

import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';

export const container = style({
  margin: '1rem',
  padding: '1rem',
  borderRadius: '0.25rem',
  backgroundColor: '#fff',
  userSelect: 'none',
});

export const message = style({
  minWidth: '66vw',
  padding: '0.5rem 0 1rem',
  lineHeight: '150%',
  wordBreak: 'break-all',
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '0.5rem',
});

export const button = style({
  height: '2rem',
  padding: '0 0.75rem',
  border: '0',
  borderRadius: '1rem',
  backgroundColor: 'transparent',
  color: colorPalette.primary[700],
  fontSize: typography.size.md,
  fontWeight: typography.weight.medium,
  transition: 'all 0.2s ease',

  ':active': {
    backgroundColor: colorPalette.primary[50],
  },
});
