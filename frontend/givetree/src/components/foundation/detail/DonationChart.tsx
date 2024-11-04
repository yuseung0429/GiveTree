import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Flex from '@/components/common/Flex';

ChartJS.register(ArcElement, Tooltip, Legend);

type DonationChartProps = {
  collectedAmount: number;
  spentAmount: number;
};

export default function DonationChart({
  collectedAmount,
  spentAmount,
}: DonationChartProps) {
  const executionRate = Math.round((spentAmount / collectedAmount) * 100);

  const data = {
    labels: ['사용된 금액', '남은 금액'],
    datasets: [
      {
        data: [spentAmount, collectedAmount - spentAmount],
        backgroundColor: [colorPalette.primary[500], colorPalette.grey[300]],
        hoverBackgroundColor: [
          colorPalette.primary[600],
          colorPalette.grey[400],
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%', // 도넛 모양의 내부 반지름 크기
    plugins: {
      legend: { display: false }, // 레이블 표시 제거
      tooltip: { enabled: false }, // 툴팁 표시 제거
    },
  };

  return (
    <Box
      style={{
        position: 'relative',
        width: '70%',
        maxWidth: '250px',
        margin: 'auto',
      }}
    >
      <Doughnut data={data} options={options} />
      <Flex
        alignItems="center"
        justifyContent="center"
        style={{
          textAlign: 'center',
        }}
      >
        <Typography weight="bold" size="24px" color={colorPalette.grey[900]}>
          집행률
        </Typography>
        <Typography weight="medium" size="20px" color={colorPalette.grey[700]}>
          {executionRate}%
        </Typography>
      </Flex>
    </Box>
  );
}
