'use client';

import { keyframes, style } from '@vanilla-extract/css';

export const fadeIn = keyframes({
  '0%': {
    opacity: '0',
  },

  '100%': {
    opacity: '1',
  },
});

export const popup = keyframes({
  '0%': {
    transform: 'translateY(-100%)',
    opacity: '0',
  },

  '100%': {
    transform: 'translateY(0)',
    opacity: '1',
  },
});

export const backdrop = style({
  position: 'fixed',
  inset: '0',
  zIndex: '10',
  backgroundColor: '#00000054',
  animation: `${fadeIn} 0.2s ease 0s 1`,
});

export const container = style({
  position: 'fixed',
  top: '0',
  right: '0',
  left: '0',
  height: '40%',
  borderBottomLeftRadius: '0.375rem',
  borderBottomRightRadius: '0.375rem',
  boxShadow: '0 0 0.5rem 0 #999',
  backgroundColor: '#fff',
  animation: `${[popup]} 0.3s ease-out 0s 1`,
});
