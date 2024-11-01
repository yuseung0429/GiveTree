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

// article
export const article = style({
  marginBottom: '30px',
});

// imageScrollContainer
export const imageScrollContainer = style({
  display: 'flex',
  overflowX: 'auto', // 가로 스크롤 허용
  gap: '10px', // 이미지 간격
  paddingBottom: '10px', // 스크롤 영역 여유 공간
  scrollbarWidth: 'none', // Firefox에서 스크롤바 숨김
  msOverflowStyle: 'none', // IE/Edge에서 스크롤바 숨김
  '::-webkit-scrollbar': {
    display: 'none', // Chrome, Safari에서 스크롤바 숨김
  },
});

// introBox
export const bottomBox = style({
  marginTop: '10px',
});

// TabContainer
export const TabContainer = style({
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
  paddingBottom: '60px',
});

// imageBox
export const imageBox = style({
  width: '30%',
  minWidth: '150px',
  maxWidth: '280px',
  aspectRatio: '4 / 3',
  backgroundColor: colorPalette.primary[50],
});

// 후원하기 버튼
export const fixGiveBtn = style({
  position: 'fixed',
  bottom: '10px',
});
