'use server';

import fetchWrapper from '@/lib/fetchWrapper';

export interface NotificationItem {
  title: string;
  body: string;
  createdDateTime: string;
}

const getNotifications = async (): Promise<NotificationItem[]> => {
  try {
    const response = await fetchWrapper(`/notifications`, {
      method: 'GET',
    });

    const data = await response.json();
    return data;
  } catch {
    return [];
  }
};

export default getNotifications;
