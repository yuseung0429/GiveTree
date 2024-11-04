import { style } from '@vanilla-extract/css';

export const button = style({
  position: 'relative',
  width: '100%',
  height: '3.25rem',
  border: '0.0625rem solid',
  borderRadius: '0.25rem',
  transition: 'all 0.1s ease',

  ':active': {
    filter: 'contrast(90%)',
  },
});

export const icon = style({
  position: 'absolute',
  top: '50%',
  left: '0.75rem',
  transform: 'translateY(-50%)',
});
