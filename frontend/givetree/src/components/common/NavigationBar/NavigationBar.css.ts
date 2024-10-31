import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const container = style({
  flex: '0 0',
  width: '100%',
  height: 'auto',
});

export const decoImage = style({
  display: 'flex',
  width: '100%',
  height: 'auto',
});

export const bar = style({
  paddingBottom: '2px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  bottom: '0',
  right: '0',
  backgroundColor: colorPalette.primary[50],
  zIndex: '2',
  height: '50px',
});

export const item = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',
  color: colorPalette.primary[900],
  cursor: 'pointer',
  selectors: {
    '&.active': {
      color: colorPalette.primary[400],
    },
  },
});

export const iconWrapper = style({
  width: '24px',
  height: '24px',
  padding: '2px',
});

export const text = style({
  fontSize: '0.75rem',
});
