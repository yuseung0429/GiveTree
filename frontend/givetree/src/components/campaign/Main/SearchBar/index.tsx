import * as styles from './SearchBar.css';
import { HiSearch } from 'react-icons/hi';
import Box from "@/components/common/Box";

const SearchBar = () => {
  return (
    <Box padding="0.5rem 1.25rem 1.5rem" className={styles.search}>
      <div className={styles.inputBox}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="찾고있는 캠페인이 있으신가요?"
        />
        <button className={styles.searchButton}>
          <HiSearch />
        </button>
      </div>
    </Box>
  );
};

export default SearchBar;
