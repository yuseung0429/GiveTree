import { style } from '@vanilla-extract/css';

export const sliderContainer = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  // marginLeft: '0.25em',
  // paddingRight: '0.5rem',
  gap: '1rem',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  scrollSnapType: 'x mandatory',
});

export const dotsContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0.25rem',
});

export const dot = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  margin: '0 5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
});
