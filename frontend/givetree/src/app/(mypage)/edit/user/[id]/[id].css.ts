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

export const introduceBox = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  width: '100%',
  padding: '1.5rem 2rem',
  gap: '1rem',
});
