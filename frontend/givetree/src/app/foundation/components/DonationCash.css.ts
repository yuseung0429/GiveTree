import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

// 상단 배너
export const cashbox = style({
  width: '100%',
  padding: '20px 10px'
});

export const foundationLogo = style({
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  padding: '10px',
  flexShrink: '0',
  border: `1px solid ${colorPalette.grey[400]}`
});

// 금액 입력 스타일
export const amountInput = style({
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderBottom: `1px solid ${colorPalette.grey[400]}`,
  borderRadius: '4px',
  textAlign: 'right',
  
  
});

// 금액 버튼 스타일
export const amountButton = style({
  padding: '8px 12px',
  fontSize: '14px',
  color: colorPalette.grey[800],
  backgroundColor: 'white',
  border: `1px solid ${colorPalette.grey[400]}`,
  borderRadius: '4px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: colorPalette.grey[200],
  }
});