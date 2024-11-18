import React from 'react';
import Button from '@/components/common/Button';
import * as style from './DonationModal.css';
import Flex from '@/components/common/Flex';
import { useRouter } from 'next/navigation';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  foundationId: number;
}

export default function DonationModal({
  isOpen,
  onClose,
  foundationId,
}: DonationModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleOneTimeDonation = () => {
    router.push(`/foundation/${foundationId}/donation`);
  };

  const handleRegularDonation = () => {
    router.push(`/foundation/${foundationId}/donation/regular`);
  };

  return (
    <Flex className={style.overlay} onClick={handleOverlayClick}>
      <Flex gap="0.75rem" flexDirection="column" className={style.modalContent}>
        <Button size='lg' fullWidth onClick={handleOneTimeDonation}>
          일시 후원
        </Button>
        <Button size='lg' fullWidth onClick={handleRegularDonation}>
          정기 후원
        </Button>
      </Flex>
    </Flex>
  );
}
