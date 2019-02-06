/* eslint-disable no-param-reassign */
import React from 'react';
import { HorizontalBarChart } from 'grommet-controls/chartjs';
import ChartCard from '../charts/ChartCard';

export default ({ issues }) => {
  const grouppedIssues = issues.reduce((d, issue) => {
    const assignedTo = issue.assignees || (issue.assignee ? [issue.assignee] : []);
    if (assignedTo.length > 0) {
      assignedTo.forEach((user) => {
        if (d[user.login]) {
          d[user.login] += 1;
        } else {
          d[user.login] = 1;
        }
      });
    } else {
      d.unassigned += 1;
    }
    return d;
  }, { unassigned: 0 });

  const data = [];
  const labels = [];
  Object.keys(grouppedIssues).forEach((key) => {
    labels.push(key);
    data.push(grouppedIssues[key]);
  });

  return (
    <ChartCard title='Issues by assignee'>
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

