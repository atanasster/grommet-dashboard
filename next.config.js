/* eslint-disable no-param-reassign */
const { IgnorePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const dedupeDependencies = (dependencies, alias) => (
  dependencies.reduce((res, dependecy) => ({ ...res, [dependecy]: path.resolve(`./node_modules/${dependecy}`) }), alias)
);
const initExport = {
  // eslint-disable-next-line no-unused-vars
  webpack: (config, env) => {
    config.plugins.push(new Dotenv({ path: './.env' }));
    config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/));

    if (process.env.ANALYZE_BUILD) {
      // eslint-disable-next-line global-require
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }
    if (process.env.NODE_ENV === 'alias') {
      config.resolve.alias = dedupeDependencies(
        ['styled-components', 'grommet', 'grommet-icons', 'react', 'react-dom'], config.resolve.alias
      );
    }
    return config;
  },
};

module.exports = initExport;
