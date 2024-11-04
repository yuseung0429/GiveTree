import colorPalette from "@/styles/tokens/colorPalette";
import { style } from "@vanilla-extract/css";

export const search = style({
  display: 'flex',
  backgroundColor: colorPalette.primary[300],
  padding: '0.25rem 1.25rem 1.25rem',
});

export const inputBox = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
});

export const searchInput = style({
  width: '100%',
  height: '50px',
  padding: '10px 40px 10px 15px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '8px',
  outline: 'none',
  '::placeholder': {
    color: colorPalette.text[300],
  },
});

export const searchButton = style({
  display: 'flex',
  right: '8px',
  top: '50%',
  width: '34px',
  position: 'absolute',
  transform: 'translateY(-50%)',
  backgroundColor: colorPalette.primary[400],
  border: 'none',
  borderRadius: '8px',
  padding: '5px',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '24px'
});