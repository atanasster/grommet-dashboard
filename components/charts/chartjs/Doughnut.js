import { Doughnut as DoughnutChart } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const Doughnut = withChartTheme(DoughnutChart, { opacity: 1 });
