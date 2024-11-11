import 'server-only';

import { cookies } from 'next/headers';

const SESSIONID = 'JSESSIONID';

export const getSession = async () => {
  return (await cookies()).get(SESSIONID)?.value;
};

export const getCookie = async () => {
  return `${SESSIONID}=${(await cookies()).get(SESSIONID)?.value};`;
};

export const setSession = async (value: string) => {
  (await cookies()).set(SESSIONID, value);
};

export const deleteSession = async () => {
  return (await cookies()).delete(SESSIONID);
};
