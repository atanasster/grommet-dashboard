import { HorizontalBar } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const HorizontalBarChart = withChartTheme(HorizontalBar, { borderWidth: 3 });
