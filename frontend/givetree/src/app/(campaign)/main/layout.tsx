import AppBar from '@/components/common/AppBar';
import BottomBar from '@/components/common/BottomBar';
import Layout from '@/components/common/Layout';
import colorPalette from '@/styles/tokens/colorPalette';
import { FaTree, FaRegBell } from 'react-icons/fa';
import * as styles from './layout.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * 페이지에 따라 NavBar가 필요한 경우도 있고, 필요 없는 경우가 있어서 RootLayout에 NavBar를 정의하지 않았음.
   */
  return (
    // Layout 컴포넌트는 main 태그를 기준으로 크기를 화면에 맞추므로 반드시 main 태그를 정의해야 함!!
    <Layout>
      <header>
        <AppBar>
          <div className={styles.header}>
            <div className={styles.leftSection}>
              <FaTree color={colorPalette.primary[900]} size={24} />
              <h4>GIVE</h4>
            </div>
            <div className={styles.rightSection}>
              <FaRegBell color='#fff' size={24} />
            </div>
          </div>
        </AppBar>
      </header>

      <main>{children}</main>
      <footer>
        <BottomBar>bottom</BottomBar>
      </footer>
    </Layout>
  );
}
