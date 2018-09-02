import React from 'react';
import { ThemeContext } from 'grommet/contexts';
import { deepMerge } from 'grommet/utils/object';
import { colorForName, normalizeColor, getRGBA } from 'grommet/utils/colors';
import { colorFromIndex } from '../../../utils/colors';

// eslint-disable-next-line import/prefer-default-export
export const withChartTheme = (WrappedComponent,
  { classOpacity = 0.6, defaultScales = [{}], ...other } = {}) =>
  ({ options, data }) => (
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
          maintainAspectRatio: false,
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

        themedOptions.scales.xAxes = themedOptions.scales.xAxes || defaultScales;
        themedOptions.scales.yAxes = themedOptions.scales.yAxes || defaultScales;
        themedOptions.scales.xAxes = themedOptions.scales.xAxes.map(x => deepMerge(axisColors, x));
        themedOptions.scales.yAxes = themedOptions.scales.yAxes.map(y => deepMerge(axisColors, y));
        let datasets;
        if (data && Array.isArray(data.datasets)) {
          datasets = data.datasets
            .map((dataset, i) => {
              const {
               backgroundColor, borderColor, color, ...rest
              } = dataset;
              let newOpts;
              const themeColors = (index, itemOpacity) => {
                const lineColor = borderColor || color || colorFromIndex(index);
                const lineColors = Array.isArray(lineColor) ?
                  lineColor.map(c => colorForName(c, theme)) : colorForName(lineColor, theme);
                const fillColor = backgroundColor || lineColor;
                const opacity = itemOpacity || dataset.opacity
                  || (options && options.opacity) || classOpacity;
                const fillColors = Array.isArray(fillColor) ?
                  fillColor.map(c => getRGBA(colorForName(c, theme), opacity))
                  : getRGBA(colorForName(fillColor, theme), opacity);
                return {
                  backgroundColor: fillColors,
                  borderColor: lineColors,
                };
              };
              if (options && options.themedData && dataset.data) {
                newOpts = { backgroundColor: [], borderColor: [] };
                dataset.data.forEach((dataRow, rIndex) => {
                      const colors = themeColors(rIndex, dataRow.opacity);
                      newOpts.backgroundColor.push(colors.backgroundColor);
                      newOpts.borderColor.push(colors.borderColor);
                    });
              } else {
                newOpts = themeColors(i);
              }
              return {
                ...newOpts,
                ...other,
                ...rest,
              };
            });
        }
        return (
          <WrappedComponent
            options={themedOptions}
            data={{ ...data, datasets }}
          />
        );
      }}
    </ThemeContext.Consumer>
  );

