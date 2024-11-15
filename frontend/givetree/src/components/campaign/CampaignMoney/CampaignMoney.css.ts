import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const text = style({
  margin: '1rem 0.5rem 0.5rem 0.5rem',
});

export const progressContainer = style({
  position: 'relative',
  backgroundColor: colorPalette.grey[100],
  borderRadius: '12px',
  padding: '0.75rem',
  overflow: 'hidden',
  marginBottom: '1.5rem',
});

export const amountContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const currentAmount = style({
  fontSize: '14px',
  fontWeight: 'bold',
  color: colorPalette.text[900],
});

export const goalAmount = style({
  fontSize: '14px',
  fontWeight: 'inherit',
  color: colorPalette.text[800],
});

export const giveButton = style({
  position: 'fixed',
  bottom: '50px',
  left: '0',
  width: '100%',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
