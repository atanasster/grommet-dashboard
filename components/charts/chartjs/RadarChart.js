import { Radar } from 'react-chartjs-2';
import { withChartTheme } from './withChartTheme';

// eslint-disable-next-line import/prefer-default-export
export const RadarChart = withChartTheme(Radar, { defaultScales: [] });
