'use client';

import { axiosInstance } from '@/api/axiosInstance';

const isReserved = async (saleId: number) => {
  try {
    const response = await axiosInstance.get(
      `/sales/${saleId}/is-current-user-reserved`
    );
    return response.data === 'success';
  } catch {
    return false;
  }
};

export default isReserved;
