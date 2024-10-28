import { style, keyframes } from '@vanilla-extract/css';

const fall = keyframes({
  '0%': { transform: 'translateY(-100px)', opacity: 0.5 },
  '100%': { transform: 'translateY(100vh)', opacity: 1 },
});

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const snowflake = style({
  // position: 'absolute',
  top: '-10px',
  width: '10px',
  height: '10px',
  backgroundColor: 'white',
  borderRadius: '50%',
  animation: `${fall} 5s linear infinite, ${spin} 10s linear infinite`,
});

export const background = style({
  display: 'flex',
  width: '100%',
  height: '100vh',
  backgroundColor: 'grey'
});
