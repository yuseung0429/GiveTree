import * as styles from './ProgressBar.css';

interface ProgressBarProps {
  progress: string;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const progressValue = parseFloat(progress);

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${progress}%` }}>
        {progressValue >= 14 ? (
          <div className={styles.progressText}>{`${progress}%`}</div>
        ) : (
          <div className={styles.progressTextOutside}>{`${progress}%`}</div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
