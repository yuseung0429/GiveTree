import React from 'react';
import * as styles from './TreeProgress.css';
import Typography from '@/components/common/Typography';

interface TreeProgressProps {
  currentAmount: number;
  goalAmount: number;
  progress: number;
}

const TreeProgress: React.FC<TreeProgressProps> = ({
  currentAmount,
  goalAmount,
  progress,
}) => {
  return (
    <div className={styles.container}>
      <Typography as="h4" weight="semiBold" className={styles.goalAmountText}>
        {goalAmount?.toLocaleString()}원
      </Typography>
      <div className={styles.treeContainer}>
        <div
          className={styles.treeFill}
          style={{ height: `${progress}%` }}
        ></div>

        <Typography
          as="h4"
          weight="semiBold"
          className={styles.amountText}
          style={{ bottom: `${progress}%` }}
        >
          {currentAmount?.toLocaleString()}원
        </Typography>

        <Typography
          as="h3"
          weight="bold"
          color="#fff"
          className={styles.progressText}
          style={{ top: `${100 - progress}%` }}
        >
          {progress}%
        </Typography>
      </div>
    </div>
  );
};

export default TreeProgress;
