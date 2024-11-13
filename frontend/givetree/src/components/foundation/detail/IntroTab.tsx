import * as style from '../../../app/foundation/[id]/detail/detail.css';
import Box from '@/components/common/Box';
import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import { Foundation } from '@/api/foundation/getFoundationDetail';
import Image from 'next/image';

interface IntroTabProps {
  foundationData: Foundation;
}

export default function IntroTab({ foundationData }: IntroTabProps) {
  if (!foundationData) {
    return (
      <Box className={style.TabContainer}>
        <Typography color={colorPalette.grey[600]}>로딩중...</Typography>
      </Box>
    );
  }
  return (
    <Box className={style.TabContainer}>
      {/* 단체소개 */}
      <Box as="article" className={style.article}>
        <Typography as="h3" weight="semiBold" color={colorPalette.primary[400]}>
          단체소개
        </Typography>
        <Box className={style.bottomBox}>
          <Typography color={colorPalette.grey[700]}>
            {foundationData.introduction}
          </Typography>
        </Box>
      </Box>

      {/* 단체사진 */}
      <Box as="article" className={style.article}>
        <Typography as="h3" weight="semiBold" color={colorPalette.primary[600]}>
          단체사진
        </Typography>
        <Flex gap="10px" className={style.imageScrollContainer}>
          {foundationData.imageUrls.map((imageUrl, index) => (
            <div key={`${imageUrl}-${index}`} className={style.imageBox}>
              <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
              >
                <Image
                  src={imageUrl}
                  alt={`${foundationData.name} 단체 사진 ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 150px, 280px"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </div>
            </div>
          ))}
          {foundationData.imageUrls.length === 0 && (
            <Typography color={colorPalette.grey[500]}>
              등록된 사진이 없습니다.
            </Typography>
          )}
        </Flex>
      </Box>

      {/* 단체정보 */}
      <Box as="article" className={style.article}>
        <Typography as="h3" weight="semiBold" color={colorPalette.primary[600]}>
          단체정보
        </Typography>
        <Flex gap="20px" flexDirection="column" className={style.bottomBox}>
          {/* 공식단체명 */}
          <Box>
            <Typography
              as="h5"
              weight="medium"
              size="16px"
              color={colorPalette.grey[600]}
              style={{ marginBottom: '10px' }}
            >
              공식단체명
            </Typography>
            <Typography>{foundationData.name}</Typography>
          </Box>

          {/* 사업자등록번호 */}
          <Box>
            <Typography
              as="h5"
              weight="medium"
              size="16px"
              color={colorPalette.grey[600]}
              style={{ marginBottom: '10px' }}
            >
              사업자등록번호/고유번호
            </Typography>
            <Typography>
              {foundationData.corporateRegistrationNumber}
            </Typography>
          </Box>

          {/* 주소 및 연락처 */}
          <Box>
            <Typography
              as="h5"
              weight="medium"
              size="16px"
              color={colorPalette.grey[600]}
              style={{ marginBottom: '10px' }}
            >
              주소 및 연락처
            </Typography>
            <Flex flexDirection="column" gap={5}>
              <Typography>{foundationData.address}</Typography>
              <Typography>{foundationData.phoneNumber}</Typography>
              <Typography>{foundationData.email}</Typography>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
