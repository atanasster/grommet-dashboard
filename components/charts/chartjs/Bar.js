import { Bar as BarChart } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const Bar = withChartTheme(BarChart, { borderWidth: 1 });
