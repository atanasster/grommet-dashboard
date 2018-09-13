const { IgnorePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const withTM = require('next-plugin-transpile-modules');
const withTypescript = require('@zeit/next-typescript');

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
      config.module.rules.push({
        loader: 'babel-loader',
        test: /\.js(\?[^?]*)?$/,
        include: [path.resolve(__dirname, '../grommet-controls/src/js')],
      });
    }
    return config;
  },
  transpileModules: ['grommet-controls', 'grommet', 'grommet-icons'],
};

module.exports = withTypescript(withTM(initExport));
