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
  position: 'relative',
  overflow: 'hidden',
});

// 탭 하위 컴포넌트 컨테이너 (스크롤 영역)
export const tabContentContainer = style({
  flexGrow: 1,
  overflowY: 'auto',
  padding: '1rem',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

// article
export const article = style({
  marginBottom: '1.75rem',
});

// imageScrollContainer
export const imageScrollContainer = style({
  overflowX: 'auto', // 가로 스크롤 허용
  marginTop: '10px',
  scrollbarWidth: 'none', // Firefox에서 스크롤바 숨김
  msOverflowStyle: 'none', // IE/Edge에서 스크롤바 숨김
  '::-webkit-scrollbar': {
    display: 'none', // Chrome, Safari에서 스크롤바 숨김
  },
});

// introBox
export const bottomBox = style({
  marginTop: '10px',
  textAlign: 'justify',
  minHeight: '60px',
});

// TabContainer
export const TabContainer = style({
  width: '100%',
  flexGrow: 1,
  overflowY: 'auto',
  padding: '0.25rem',
});

// imageBox
export const imageBox = style({
  width: '30%',
  minWidth: '150px',
  maxWidth: '280px',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  backgroundColor: colorPalette.primary[50],
});

export const moneybox = style({
  width: '100%',
  height: '60px',
  borderBottom: `1px solid ${colorPalette.grey[800]}`,
  padding: '0.75rem 0.5rem',
});

// 후원하기 버튼
export const fixGiveBtn = style({
  position: 'fixed',
  bottom: '10px',
});

export const campaignCount = style({
  color: colorPalette.primary[400],
  fontWeight: '600',
  fontSize: '20px',
  marginRight: '3px',
});
