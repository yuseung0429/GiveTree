import React from 'react';
import * as styles from './TreeProgress.css';
import Typography from '@/components/common/Typography';

interface TreeProgressProps {
  currentAmount: number;
  goalAmount: number;
}

const TreeProgress: React.FC<TreeProgressProps> = ({
  currentAmount,
  goalAmount,
}) => {
  return (
    <div className={styles.container}>
      <Typography as="h4" weight="semiBold" className={styles.goalAmountText}>
        {goalAmount?.toLocaleString()}원
      </Typography>
      <div className={styles.treeContainer}>
        <div
          className={styles.treeFill}
          style={{ height: `${(currentAmount / goalAmount) * 100}%` }}
        ></div>

        <Typography
          as="h4"
          weight="semiBold"
          className={styles.amountText}
          style={{ bottom: `${(currentAmount / goalAmount) * 100}%` }}
        >
          {currentAmount?.toLocaleString()}원
        </Typography>

        <Typography
          as="h3"
          weight="bold"
          color="#fff"
          className={styles.progressText}
          style={{ top: `${100 - (currentAmount / goalAmount) * 100}%` }}
        >
          {(currentAmount / goalAmount) * 100}%
        </Typography>
      </div>
    </div>
  );
};

export default TreeProgress;
