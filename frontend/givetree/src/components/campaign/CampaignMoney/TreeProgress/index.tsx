import React, { useEffect, useState } from 'react';
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
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    // const percentage = (currentAmount / goalAmount) * 100;
    if (progress)
    setFillHeight(progress);
  }, [progress]);

  return (
    <div className={styles.container}>
      <Typography as="h4" weight="semiBold" className={styles.goalAmountText}>
        {goalAmount?.toLocaleString()}원
      </Typography>
      <div className={styles.treeContainer}>
        <div
          className={styles.treeFill}
          style={{ height: `${fillHeight}%` }}
        ></div>

        <Typography
          as="h4"
          weight="bold"
          className={styles.amountText}
          style={{ bottom: `${fillHeight}%` }}
        >
          {currentAmount?.toLocaleString()}원
        </Typography>

        <Typography
          as="h3"
          weight="bold"
          color='#fff'
          className={styles.progressText}
          style={{ top: `${100 - fillHeight}%` }}
        >
          {progress}%
        </Typography>
      </div>
    </div>
  );
};

export default TreeProgress;
