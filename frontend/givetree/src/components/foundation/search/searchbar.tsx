'use client';

import { useRouter } from 'next/navigation';
import * as style from './searchbarStyle.css';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchbarProps {
  initialValue?: string;
  onSearch?: (query: string) => void;
}

export default function Searchbar({
  initialValue = '',
  onSearch,
}: SearchbarProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialValue);

  const handleSearch = () => {
    if (!search.trim()) return;

    if (onSearch) {
      onSearch(search);
    } else {
      router.push(`/foundation/search?q=${search}`);
    }
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={style.container}>
      <input
        className={style.searchInput}
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="찾고계신 재단이 있으신가요?"
      />
      <button className={style.searchBtn} onClick={handleSearch}>
        <IoSearch size={22} />
      </button>
    </div>
  );
}
