/* eslint-disable no-param-reassign */
import React from 'react';
import { HorizontalBarChart } from 'grommet-controls/chartjs';
import ChartCard from '../charts/ChartCard';

export default ({ issues }) => {
  const grouppedIssues = issues.reduce((d, issue) => {
    if (d[issue.user.login]) {
      d[issue.user.login] += 1;
    } else {
      d[issue.user.login] = 1;
    }
    return d;
  }, {});

  const data = [];
  const labels = [];
  Object.keys(grouppedIssues).forEach((key) => {
    labels.push(key);
    data.push(grouppedIssues[key]);
  });

  return (
    <ChartCard title='Issues by author' basis={labels.length > 30 ? 'large' : undefined}>
      <HorizontalBarChart
        data={{
          labels,
          datasets: [{ data }],
        }}
        options={{
          themedData: true,
          legend: { display: false },
        }}
      />
    </ChartCard>
  );
};

