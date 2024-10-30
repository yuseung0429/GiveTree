import Box from '@/components/common/Box';
import * as styles from './main.css';
import TextField from '@/components/common/TextField';

export default function Home() {
  return (
    <Box as="main" padding="1.25rem" className={styles.search}>
      {/* <Box
        padding="1rem"
        borderRadius="0.5rem"
        backgroundColor={color.grey[300]}
      >
        <Link href="/signin">
          <Button>회원가입</Button>
        </Link>
      </Box> */}
      <div style={{border: 'none', width: '100%'}}>
        <TextField
          defaultValue="찾고있는 캠페인이 있으신가요? "
          variant={'outlined'}
          size='md'
        />
      </div>
    </Box>
  );
}
