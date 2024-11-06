import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const modalBackdrop = style({
  position: 'absolute',
  top: '55px',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

export const modal = style({
  width: '80%',
  maxWidth: '500px',
  aspectRatio: '1',
  maxHeight: '500px',
  border: `2px solid ${colorPalette.primary[300]} `,
  borderRadius: '12px',
  backgroundColor: 'white',
  padding: '20px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '50px',
  marginLeft: 'auto',
  marginRight: '0.85rem',
});

export const closeButton = style({
  position: 'absolute',
  top: '0.5rem',
  right: '0.5rem',
  width: '40px',
  height: '40px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '15px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  ':hover': {
    backgroundColor: 'white',
  },
  '::after': {
    content: "'x'",
    color: 'black',
  },
});

export const cardsContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 200px)',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px',
  '@media': {
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
    },
  },
});

export const card = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  backgroundColor: '#eee',
  borderRadius: '8px',
  textDecoration: 'none',
  color: 'black',
  fontSize: '24px',
  fontWeight: 500,
  maxWidth: '200px',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '80%',
    },
  },
});
