import { HorizontalBar as HorizontalBarChart } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const HorizontalBar = withChartTheme(HorizontalBarChart, { borderWidth: 1 });
