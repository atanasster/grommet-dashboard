import { Doughnut } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const DoughnutChart = withChartTheme(Doughnut, { classOpacity: 1, defaultScales: [] });
