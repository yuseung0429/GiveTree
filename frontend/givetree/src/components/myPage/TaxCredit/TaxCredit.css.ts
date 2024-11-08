import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';
import { style } from '@vanilla-extract/css';

export const clacBox = style({
  border: `1px solid ${colorPalette.primary[700]}`,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
});

export const moneyInput = style({
  width: '70%',
  height: '40px',
  padding: '0.5rem 1rem',
  fontSize: typography.size.lg,
  fontWeight: typography.weight.medium,
  color: colorPalette.text[900],
  border: `1px solid ${colorPalette.primary[500]}`,
  borderRadius: '12px',
  outline: 'none',
  '::placeholder': {
    color: colorPalette.text[300],
  },
});

export const openBox = style({
  overflow: 'hidden',
  maxHeight: '0',
  transition: 'max-height 0.4s ease',
});

export const openContent = style({
  maxHeight: '100%',
});
