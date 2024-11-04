import { style } from '@vanilla-extract/css';

export const menu = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.25rem',
  height: '2.25rem',
  border: '0',
  borderRadius: '50%',
  backgroundColor: 'transparent',
  color: '#fff',
  fontSize: '1.5rem',
  transition: 'all 0.2s ease',

  ':active': {
    backgroundColor: '#00000026',
  },
});
