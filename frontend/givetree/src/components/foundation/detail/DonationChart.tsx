import * as style from './DonationChart.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Box from '@/components/common/Box';
import Typography from '@/components/common/Typography';
import colorPalette from '@/styles/tokens/colorPalette';
import Flex from '@/components/common/Flex';
import { Foundation } from '@/api/foundation/getFoundationDetail';

interface DonationChartProps {
  foundationData: Foundation;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonationChart({ foundationData }: DonationChartProps) {
  const executionRate =
    foundationData.totalFundraisingAmount === 0
      ? 0
      : Math.round(
          (foundationData.executedAmount /
            foundationData.totalFundraisingAmount) *
            100
        );

  const data = {
    labels: ['총 모금 금액', '지출 금액'],
    datasets: [
      {
        data:
          foundationData.totalFundraisingAmount === 0
            ? [1]
            : [
                foundationData.executedAmount,
                foundationData.totalFundraisingAmount -
                  foundationData.executedAmount,
              ],
        backgroundColor:
          foundationData.totalFundraisingAmount === 0
            ? [colorPalette.grey[300]]
            : [colorPalette.secondary[300], colorPalette.grey[300]],
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
