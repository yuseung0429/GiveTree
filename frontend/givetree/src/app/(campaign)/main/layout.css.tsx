
import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '90vw',
  alignItems: 'center',
  padding: '0 16px',
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
});

export const rightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '3px',
});
