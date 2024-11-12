import * as styles from './ProgressBar.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} style={{ width: `${progress}%` }}>
        <div className={styles.progressText}>
          {progress ? `${progress}%` : ''}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
