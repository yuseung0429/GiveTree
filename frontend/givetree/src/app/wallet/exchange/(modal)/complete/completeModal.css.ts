import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '100vh',
  backgroundColor: '#F5F5F5',
  position: 'fixed',
  zIndex: '100',
  animation: 'all 3s',
});

// 확인버튼
export const textbox = style({
  color: colorPalette.grey[900],
  padding: '100px 0',
});

// 확인버튼
export const yesBtn = style({
  position: 'fixed',
  bottom: '10px',
});
