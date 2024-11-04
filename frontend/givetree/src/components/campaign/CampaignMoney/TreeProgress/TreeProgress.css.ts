import colorPalette from '@/styles/tokens/colorPalette';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '55px',
});

export const goalAmountText = style({
  marginBottom: '0.25rem',
});

export const treeContainer = style({
  position: 'relative',
  width: '250px',
  height: '350px',
  backgroundImage: 'url("/images/campaign/treeIcon.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  maskImage: 'url("/images/campaign/treeIcon.png")',
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskImage: 'url("/images/campaign/treeIcon.png")',
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  overflow: 'hidden',
});

export const treeFill = style({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  background: `linear-gradient(to top, ${colorPalette.primary[300]}, ${colorPalette.primary[600]})`,
});

export const amountText = style({
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  marginBottom: '0.25rem',
});

export const progressText = style({
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  marginTop: '0.75rem',
});
