import * as styles from './SearchBar.css';
import { HiSearch } from 'react-icons/hi';
import Box from "@/components/common/Box";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/campaign?q=${search}`);
  }

  return (
    <Box padding="0.5rem 1.25rem 1.5rem" className={styles.search}>
      <div className={styles.inputBox}>
        <input
          type="text"
          value={search}
          onChange={onChangeSearch}
          className={styles.searchInput}
          placeholder="찾고있는 캠페인이 있으신가요?"
        />
        <button className={styles.searchButton} onClick={onSubmit}>
          <HiSearch />
        </button>
      </div>
    </Box>
  );
};

export default SearchBar;
