import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

export const container = style({
  width: '100%',
  height: '100%',
  paddingTop: '100px',
});

export const title = style({
  marginBottom: '8px',
});

export const subtitle = style({
  marginBottom: '32px',
});

// 비밀번호 입력 상자
export const passwordDisplay = style({
  display: 'flex',
  gap: '12px',
  marginBottom: '48px',
});

export const passwordDot = style({
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  backgroundColor: colorPalette.grey[400],
});

export const filledDot = style({
  backgroundColor: colorPalette.grey[800],
});

export const numberPad = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridAutoRows: '1fr',
  width: '100%',
  gap: '0',
  marginTop: 'auto',
});

export const numberButton = style({
  fontSize: '24px',
  fontWeight: '500',
  width: '100%',
  height: '65px',
  border: 'none',
});

export const actionButton = style({
  border: 'none',
  padding: '20px',
  fontSize: '16px',
  cursor: 'pointer',
});
