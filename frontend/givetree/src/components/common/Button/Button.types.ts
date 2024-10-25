import type { RecipeVariants } from '@vanilla-extract/recipes';

import { button } from './Button.css';

export type ButtonVariants = Exclude<RecipeVariants<typeof button>, undefined>;

export type ButtonVariant<T extends keyof ButtonVariants> = Exclude<
  ButtonVariants[T],
  undefined
>;
