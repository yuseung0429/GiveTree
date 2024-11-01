import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const progressBarContainer = style({
  backgroundColor: colorPalette.grey[200],
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  height: '14px',
  // overflow: 'hidden',
  marginBottom: '0.5rem',
});

export const progressBar = style({
  backgroundColor: colorPalette.secondary[500],
  height: '100%',
  borderRadius: '8px',
  position: 'relative',
});

export const progressText = style({
  position: 'absolute',
  right: '50%',
  transform: 'translateX(50%)',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  color: 'white',
});
