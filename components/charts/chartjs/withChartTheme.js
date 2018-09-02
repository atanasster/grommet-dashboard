import React from 'react';
import { ThemeContext } from 'grommet/contexts';
import { deepMerge } from 'grommet/utils/object';
import { colorForName, normalizeColor, getRGBA } from 'grommet/utils/colors';
import { colorFromIndex } from '../../../utils/colors';

// eslint-disable-next-line import/prefer-default-export
export const withChartTheme = (WrappedComponent, { opacity = 0.6, ...other } = {}) =>
  ({ options, data, ...rest }) => (
    <ThemeContext.Consumer>
      {(theme) => {
        const textColor = normalizeColor(theme.global.text.color, theme);
        const axisColors = {
          ticks: {
            fontColor: textColor,
          },
          gridLines: {
            color: theme.dark ? theme.global.colors['border-dark'] : theme.global.colors['border-light'],
          },
          scaleLabel: {
            fontColor: textColor,
          },
        };
        const defaultOptions = {
          title: {
            fontColor: textColor,
          },
          legend: {
            labels: {
              fontColor: textColor,
            },
          },
          scales: {

          },
        };
        const themedOptions = deepMerge(defaultOptions, options);

        themedOptions.scales.xAxes = themedOptions.scales.xAxes || [{}];
        themedOptions.scales.yAxes = themedOptions.scales.yAxes || [{}];
        themedOptions.scales.xAxes = themedOptions.scales.xAxes.map(x => deepMerge(axisColors, x));
        themedOptions.scales.yAxes = themedOptions.scales.yAxes.map(y => deepMerge(axisColors, y));
        const defaultData = data;
        const themeColors = (index) => {
          const color = colorForName(colorFromIndex(index), theme);
          return {
            backgroundColor: getRGBA(color, opacity),
            borderColor: color,
          };
        };
        if (defaultData && Array.isArray(defaultData.datasets)) {
          defaultData.datasets = defaultData.datasets
            .map((d, i) => {
              let newOpts;
              if (options && options.themedData && d.data) {
                newOpts = { backgroundColor: [], borderColor: [] };
                d.data.forEach((_, rIndex) => {
                      const colors = themeColors(rIndex);
                      newOpts.backgroundColor.push(colors.backgroundColor);
                      newOpts.borderColor.push(colors.borderColor);
                    });
              } else {
                newOpts = themeColors(i);
              }
              return {
                ...newOpts,
                ...other,
                ...d,
              };
            });
        }
        return (
          <WrappedComponent
            options={themedOptions}
            data={defaultData}
            {...rest}
          />
        );
      }}
    </ThemeContext.Consumer>
  );

