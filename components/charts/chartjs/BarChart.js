import { Bar } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const BarChart = withChartTheme(Bar, { borderWidth: 1 });
