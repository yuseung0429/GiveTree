import { style } from '@vanilla-extract/css';

export const profileConatainer = style({
  backgroundColor: '#fff',
  borderTopLeftRadius: '50%',
  borderTopRightRadius: '50%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

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

export const info = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0.5rem 2.75rem 1rem',
});
