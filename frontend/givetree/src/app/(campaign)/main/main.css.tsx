import colorPalette from "@/styles/tokens/colorPalette";
import { style } from "@vanilla-extract/css";

export const search = style({
  display: 'flex',
  backgroundColor: colorPalette.primary[300],
  marginTop: '0',
  border: `1px solid ${colorPalette.primary[300]}`
})