/* eslint-disable no-param-reassign */
import React from 'react';
import { HorizontalBarChart } from 'grommet-controls/chartjs';
import ChartCard from '../charts/ChartCard';

export default ({ issues }) => {
  const grouppedIssues = issues.reduce((d, issue) => {
    if (issue.labels && issue.labels.length > 0) {
      issue.labels.forEach((label) => {
        if (d[label.name]) {
          d[label.name] += 1;
        } else {
          d[label.name] = 1;
        }
      });
    } else {
      d.unlabelled += 1;
    }
    return d;
  }, { unlabelled: 0 });

  const data = [];
  const labels = [];
  Object.keys(grouppedIssues).forEach((key) => {
    labels.push(key);
    data.push(grouppedIssues[key]);
  });

  return (
    <ChartCard title='Issues by label'>
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

