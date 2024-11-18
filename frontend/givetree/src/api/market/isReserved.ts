'use client';

import { axiosInstance } from '@/api/axiosInstance';

const isReserved = async (saleId: number) => {
  try {
    const response = await axiosInstance.get<boolean>(
      `/sales/${saleId}/is-current-user-reserved`
    );

    return response.data === true;
  } catch {
    return false;
  }
};

export default isReserved;
