import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

// 최상위 부모
export const cashbox = style({
  width: '100%',
});

// 기업로고
export const foundationLogo = style({
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  padding: '10px',
  flexShrink: '0',
  border: `1px solid ${colorPalette.grey[400]}`,
});

// 금액 입력 박스
export const inputBox = style({
  margin: '20px 0 10px 0',
});

// 금액 입력 Input
export const amountInput = style({
  width: '100%',
  padding: '10px',
  border: 'none',
  fontSize: '16px',
  borderBottom: `2px solid ${colorPalette.grey[400]}`,
  textAlign: 'right',
  outline: 'none',
  ':focus': {
    borderBottom: `2px solid ${colorPalette.primary[400]}`,
  },
});

// 금액 버튼 스타일
export const amountButton = style({
  padding: '6px 12px',
  fontSize: '14px',
  color: colorPalette.grey[800],
  backgroundColor: 'white',
  border: `1px solid ${colorPalette.grey[600]}`,
  borderRadius: '4px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: colorPalette.primary[50],
  },
});
