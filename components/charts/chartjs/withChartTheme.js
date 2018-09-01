import React from 'react';
import { ThemeContext } from 'grommet/contexts';
import { deepMerge } from 'grommet/utils/object';
import { colorForName, normalizeColor } from 'grommet/utils/colors';
import { colorFromIndex } from '../../../utils/colors';

// eslint-disable-next-line import/prefer-default-export
export const withChartTheme = (WrappedComponent, { borderThemed, dataOptions, ...other } = {}) =>
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
          legend: {
            labels: {
              // This more specific font property overrides the global property
              fontColor: textColor,
            },
          },
          scales: {

          },
          ...other,
        };
        const themedOptions = deepMerge(defaultOptions, options);

        themedOptions.scales.xAxes = themedOptions.scales.xAxes || [];
        themedOptions.scales.yAxes = themedOptions.scales.yAxes || [];
        themedOptions.scales.xAxes = themedOptions.scales.xAxes.map(x => deepMerge(axisColors, x));
        themedOptions.scales.yAxes = themedOptions.scales.yAxes.map(y => deepMerge(axisColors, y));
        const defaultData = data;
        const colorName = borderThemed ? 'borderColor' : 'backgroundColor';
        if (defaultData && Array.isArray(defaultData.datasets)) {
          defaultData.datasets = defaultData.datasets
            .map((d, i) => {
              if (d[colorName]) {
                return d;
              }
              const newOpts = {};
              if (options && options.themedData && d.data) {
                newOpts[colorName] = d.data
                    .map((_, rIndex) => (colorForName(colorFromIndex(rIndex), theme)));
              } else {
                newOpts[colorName] = colorForName(colorFromIndex(i), theme);
              }
              return {
                ...dataOptions,
                ...newOpts,
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

