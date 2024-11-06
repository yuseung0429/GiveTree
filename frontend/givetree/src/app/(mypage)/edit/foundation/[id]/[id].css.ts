import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const changeImage = style({
  display: 'flex',
  position: 'absolute',
  top: '30px',
  left: '53%',
  marginLeft: 'auto',
  marginRight: '1rem',
  marginTop: '0.5rem',
  width: '48px',
  justifyContent: 'flex-end',
  zIndex: 1000,
});

export const name = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.25rem',
  marginTop: '78px',
  marginBottom: '1rem',
});

export const email = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0.5rem 2.75rem 1rem',
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
