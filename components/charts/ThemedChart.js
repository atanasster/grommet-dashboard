import React from 'react';
import { ThemeContext } from 'grommet';
import { deepMerge } from 'grommet/utils/object';
import { normalizeColor } from 'grommet/utils/colors';

export default WrappedComponent => ({ options, ...rest }) => (
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
        };
        const themedOptions = deepMerge(defaultOptions, options);

        themedOptions.scales.xAxes = themedOptions.scales.xAxes || [];
        themedOptions.scales.yAxes = themedOptions.scales.yAxes || [];
        themedOptions.scales.xAxes = themedOptions.scales.xAxes.map(x => deepMerge(axisColors, x));
        themedOptions.scales.yAxes = themedOptions.scales.yAxes.map(y => deepMerge(axisColors, y));
        return (
          <WrappedComponent
            options={themedOptions}
            {...rest}
          />
        );
      }}
  </ThemeContext.Consumer>
);
