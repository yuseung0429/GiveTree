import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const mainContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  gap: '12px',
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  padding: '1.25rem',
  backgroundColor: 'white',
});

export const sectionTitle = style({
  margin: '0.25rem 0.5rem 0rem 0.5rem',
  color: colorPalette.text[800],
  fontWeight: 'bold',
});
