import NavigationBarItem from '@/components/common/NavigationBar/NavigationBarItem';
import * as styles from './NavigationBar.css';

import Image from 'next/image';
import fetchWrapper from '@/lib/fetchWrapper';

export default async function NavigationBar() {
  const response = await fetchWrapper('/members/session', { method: 'GET' });
  const user = await response.json();
  const { role } = user;

  return (
    <div className={styles.container}>
      <Image
        src="/images/decoBar.png"
        width={800}
        height={12}
        alt="Deco Bar"
        className={styles.decoImage}
      />
      <div className={styles.bar}>
        <NavigationBarItem role={role} />
      </div>
    </div>
  );
}
