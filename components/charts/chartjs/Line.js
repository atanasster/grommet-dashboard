import { Line as LineChart } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const Line = withChartTheme(LineChart, { backgroundColor: 'transparent' });
