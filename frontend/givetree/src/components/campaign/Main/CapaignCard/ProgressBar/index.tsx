import * as styles from './ProgressBar.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${progress}%`}}>
        <span className={styles.progressText}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
