'use server';

import fetchWrapper from '@/lib/fetchWrapper';
import { deleteSession } from '@/lib/session';

export default async function signout() {
  try {
    await deleteSession();
    await fetchWrapper(`/logout`, {
      method: 'POST',
    });

    return true;
  } catch {
    return false;
  }
}
