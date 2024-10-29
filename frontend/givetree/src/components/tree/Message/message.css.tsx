import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const modal = style({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '280px',
  height: '240px',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: `${colorPalette.text[50]}`,
  padding: '35px 20px 20px 20px',
  border: `2px dashed ${colorPalette.primary[500]}`,
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1000,
});

export const overlay = style({
  position: 'fixed',
  width: '100vw',
  height: '120vh',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 999,
});

export const decorationImg = style({
  position: 'absolute',
  top: '-30px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60px',
  height: '60px',
  zIndex: 1,
});

export const messageText = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'center',
  width: '240px',
  height: '180px',
  lineHeight: '1.8',
});
