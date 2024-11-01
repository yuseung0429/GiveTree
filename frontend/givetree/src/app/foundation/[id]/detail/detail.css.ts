import { style } from '@vanilla-extract/css';
import colorPalette from '@/styles/tokens/colorPalette';

// 상단 배너
export const fixBox = style({
  width: '100%',
  flexShrink: '0',
  position: 'sticky',
  top: 0,
  zIndex: 10,
});


// 상단 배너
export const foundationBanner = style({
  width: '100%',
  maxHeight: '320px',
  aspectRatio: '16 / 9',
  backgroundColor: colorPalette.primary[50],
});

// 탭 하위 컴포넌트 컨테이너 (스크롤 영역)
export const tabContentContainer = style({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '16px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});


// 탭 컨테이너
export const TabContainer = style({
  width: '100%',
  backgroundColor: colorPalette.primary[100],
  height: '600px',
  flexGrow: 1,
  overflowY: 'auto',
  padding: '16px',
  paddingBottom: '60px'
});

// 후원하기 버튼
export const fixGiveBtn = style({
  position: 'fixed',
  bottom: '10px'
});