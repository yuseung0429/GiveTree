import React from 'react';
import Button from '@/components/common/Button';
import * as style from './DonationModal.css';
import Flex from '@/components/common/Flex';
import { useRouter } from 'next/navigation';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleOneTimeDonation = () => {
    router.push(`/foundation/1/donation`);
  };

  const handleRegularDonation = () => {
    router.push(`/foundation/1/donation/regular`);
  };

  return (
    <Flex className={style.overlay} onClick={handleOverlayClick}>
      <Flex gap="15px" flexDirection="column" className={style.modalContent}>
        <Button size="xl" fullWidth onClick={handleOneTimeDonation}>
          일시 후원
        </Button>
        <Button size="xl" fullWidth onClick={handleRegularDonation}>
          정기 후원
        </Button>
      </Flex>
    </Flex>
  );
}
