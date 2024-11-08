import * as style from './DonationChart.css';
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
    labels: ['총 모금 금액', '지출 금액'],
    datasets: [
      {
        data: [spentAmount, collectedAmount - spentAmount],
        backgroundColor: [colorPalette.secondary[300], colorPalette.grey[300]],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: false,
  };

  return (
    <Box
      style={{
        position: 'relative',
        width: '75%',
        maxWidth: '250px',
        aspectRatio: '1',
        margin: 'auto',
      }}
    >
      <Doughnut data={data} options={options} className={style.doughnutChart} />
      <Flex
        flexDirection="column"
        alignItems="center"
        gap={5}
        className={style.doughnutText}
      >
        <Typography weight="semiBold" size={22} color={colorPalette.grey[900]}>
          집행률
        </Typography>
        <Typography weight="semiBold" size={20} color={colorPalette.grey[700]}>
          {executionRate}%
        </Typography>
      </Flex>
    </Box>
  );
}
