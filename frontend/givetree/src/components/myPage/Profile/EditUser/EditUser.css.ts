import colorPalette from '@/styles/tokens/colorPalette';
import typography from '@/styles/tokens/typography';
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

export const inputBox = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0.5rem',
  width: '100%',
});

export const nameInput = style({
  width: '60%',
  height: '50px',
  padding: '0.5rem',
  fontSize: typography.size.xl,
  fontWeight: typography.weight.semiBold,
  color: colorPalette.text[900],
  border: `1.5px solid ${colorPalette.primary[500]}`,
  borderRadius: '12px',
  outline: 'none',
  '::placeholder': {
    color: colorPalette.text[300],
  },
});

export const name = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.25rem',
  marginTop: '78px',
});

export const email = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '1.5rem 2.75rem',
});

export const modifyButton = style({
  width: '100%',
  padding: '0 2.25rem 1.5rem',
});
