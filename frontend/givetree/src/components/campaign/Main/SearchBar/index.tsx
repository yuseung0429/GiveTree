'use client';

import * as styles from './SearchBar.css';
import { HiSearch } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>('');

  const q = searchParams.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/main/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className={styles.search}>
      <div className={styles.inputBox}>
        <input
          type="text"
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
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
