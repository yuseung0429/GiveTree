import { keyframes, style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
  justifyContent: 'center',
  overflow: 'hidden',
  alignItems: 'center',
});

export const treeImage = style({
  display: 'flex',
  width: '100%',
  height: '70vh',
  overflow: 'hidden',
  perspective: '1000px',
  transition: 'transform 0.4s ease',
  filter: 'drop-shadow(0px -3px 12px rgba(68, 68, 68, 0.3))',
});

export const flip = style({
  transform: 'rotateY(180deg)',
});

const swayAnimation = keyframes({
  '0%': { transform: 'rotate(-5deg)' },
  '50%': { transform: 'rotate(5deg)' },
  '100%': { transform: 'rotate(-5deg)' },
});

export const decoration = style({
  cursor: 'pointer',
  filter: 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.2))',
  animation: `${swayAnimation} 2s ease-in-out infinite`,
});

export const decorationContainer = style({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transform: 'translate(-50%, -50%)',
});

export const messageName = style({
  color: 'white',
  fontSize: '0.75rem',
  marginTop: '2px',
  textAlign: 'center',
  pointerEvents: 'none',
});
