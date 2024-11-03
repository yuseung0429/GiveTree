import { RecipeVariants } from '@vanilla-extract/recipes';

import * as s from './ProgressIndicator.css';

type ProgressIndicatorVariants = NonNullable<
  RecipeVariants<typeof s.progressIndicator>
>;

interface ProgressIndicatorProps extends ProgressIndicatorVariants {
  value: number;
  max: number;
}

const ProgressIndicator = ({
  value,
  max,
  color = 'primary',
  size = 'md',
}: ProgressIndicatorProps) => {
  return (
    <div className={s.progressIndicator({ color, size })}>
      <div className={s.fill} style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
};

export default ProgressIndicator;
