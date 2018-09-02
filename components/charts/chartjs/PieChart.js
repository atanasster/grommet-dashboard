import { Pie } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const PieChart = withChartTheme(Pie, { classOpacity: 1, defaultScales: [] });
