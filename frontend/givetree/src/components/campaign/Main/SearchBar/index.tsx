'use client';

import * as styles from './SearchBar.css';
import { HiSearch } from 'react-icons/hi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/main/search?q=${search}`);
  };

  return (
    <div className={styles.search}>
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
    </div>
  );
};

export default SearchBar;
