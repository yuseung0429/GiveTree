import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const introduceInput = style({
  height: 'auto',
  border: `1.2px solid ${colorPalette.primary[500]}`,
  padding: '0.75rem',
  fontSize: '18px',
  borderRadius: '12px',
  color: colorPalette.text[900],
  '::placeholder': {
    color: colorPalette.text[300],
  },
});

export const modifyButton = style({
  width: '100%',
});

export const introduceBox = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  width: '100%',
  padding: '1.25rem 2rem',
  gap: '1rem',
});

export const subContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '1.25rem 2rem',
});
