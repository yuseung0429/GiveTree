"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import  * as style from "./searchbarStyle.css"
import { IoSearch } from "react-icons/io5";


export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/foundation/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
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
      <button 
        className={style.searchBtn}
        onClick={onSubmit}>
        <IoSearch size={22} />
      </button>
    </div>
  );
}
