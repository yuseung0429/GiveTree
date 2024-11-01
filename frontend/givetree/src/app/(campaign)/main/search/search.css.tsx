import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  backgroundColor: colorPalette.primary[300],
  overflowY: 'auto',
});

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '16px',
  padding: '1.25rem',
  minHeight: '100vh',
  backgroundColor: 'white',
});

export const sectionTitle = style({
  margin: '0.25rem 0.5rem 0rem 0.5rem',
  color: colorPalette.text[800],
  fontWeight: 'bold',
});
