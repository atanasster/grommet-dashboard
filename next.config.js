/* eslint-disable no-param-reassign */
const path = require('path');
const withTM = require('next-transpile-modules');

const dedupeDependencies = (dependencies, alias) => (
  dependencies.reduce((res, dependecy) => ({ ...res, [dependecy]: path.resolve(`./node_modules/${dependecy}`) }), alias)
);
const initExport = {
  // eslint-disable-next-line no-unused-vars
  webpack: (config, env) => {
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
        ['@babel', 'styled-components', 'grommet', 'grommet-icons', 'react', 'react-dom', 'polished'], config.resolve.alias
      );
    }
    if (process.env.NODE_ENV === 'grommet') {
      config.resolve.alias = dedupeDependencies(
        ['@babel', 'styled-components', 'grommet-icons', 'react', 'react-dom', 'polished'], config.resolve.alias
      );
    }
    return config;
  },
};

if (process.env.NODE_ENV === 'alias') {
  initExport.transpileModules = ['grommet-controls'];
}
if (process.env.NODE_ENV === 'grommet') {
  initExport.transpileModules = ['grommet'];
}
if (['alias', 'grommet'].indexOf(process.env.NODE_ENV) >= 0) {
  module.exports = withTM(initExport);
} else {
  module.exports = initExport;
}
