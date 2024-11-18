'use client';

import { FormEvent, useRef, useState } from 'react';

import useSearchFoundations from '@/api/foundation/useSearchFoundations';

import * as s from './FoundationSelectModal.css';

import FoundationItem from '@/components/foundation/main/FoundationItem';
import TextField from '@/components/common/TextField';
import Flex from '@/components/common/Flex';
import Button from '@/components/common/Button';

interface FoundationSelectModalProps {
  onSelect: (id: number, name: string) => void;
}

const FoundationSelectModal = ({ onSelect }: FoundationSelectModalProps) => {
  const [query, setQuery] = useState<string>();

  const { data } = useSearchFoundations({ name: query });

  const queryRef = useRef<HTMLInputElement>(null);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQuery(queryRef.current?.value);
  };

  const handleClick = (id: number, name: string) => {
    onSelect(id, name);
    history.back();
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSearchSubmit}>
        <div className={s.searchContainer}>
          <div style={{ flex: '1 1 auto' }}>
            <TextField ref={queryRef} placeholder="검색어를 입력해 주세요." />
          </div>
          <div style={{ flex: '0 0 auto' }}>
            <Button size="sm">검색</Button>
          </div>
        </div>
      </form>
      <div className={s.searchResult}>
        <Flex flexDirection="column" gap="0.5rem">
          {data?.content.map((item) => (
            <FoundationItem
              key={item.id}
              foundation={{
                id: item.id,
                introduction: item.introduction,
                name: item.name,
                profileImageUrl: item.profileImageUrl,
              }}
              onClick={() => handleClick(item.id, item.name)}
            />
          ))}
        </Flex>
      </div>
    </div>
  );
};

export default FoundationSelectModal;
