import color from '@/styles/tokens/color';

const colorPalette = {
  primary: color.teal,
  secondary: color.deepOrange,
  tertiary: color.amber,
  text: color.black,
  grey: color.grey,
  success: color.green,
  danger: color.red,
};

export type ColorPalette = keyof typeof colorPalette;

export default colorPalette;
