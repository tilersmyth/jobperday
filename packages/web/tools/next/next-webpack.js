/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const lessToJS = require('less-vars-to-js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const cssLoaderConfig = require('../plugin/css-loader-config');

const antdModifyVars = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, '../../src/styles/variables.less'),
    'utf8',
  ),
);
const ANTD_STYLE_REGX = /antd\/.*?\/style.*?/;

module.exports = (config, options) => {
  if (!options.defaultLoaders) {
    throw new Error(
      'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
    );
  }

  const { dev, isServer } = options;

  // https://github.com/ant-design/babel-plugin-import/issues/271
  // Hack to reduce bundle size by not importing all ANTD icons
  config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(
    __dirname,
    './next-antd-icon',
  );
  // https://github.com/zeit/next.js/issues/2734
  config.node = { fs: 'empty' };

  //
  // PLUGINS
  config.plugins.push(
    new webpack.ContextReplacementPlugin(
      // Restrict MomentJS locale to english
      /moment[/\\]locale$/,
      /en/,
    ),
    new FilterWarningsPlugin({
      // ignore ANTD chunk styles [mini-css-extract-plugin] warning
      exclude: /Conflicting order/,
    }),
  );

  //
  // MODULE
  const baseLessConfig = {
    dev,
    isServer,
    loaders: [
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: antdModifyVars,
        },
      },
    ],
    extensions: ['less'],
    cssLoaderOptions: {
      sourceMap: false,
      importLoaders: 2,
    },
  };

  config.module.rules.push({
    test: /\.less$/,
    include: /node_modules/,
    use: cssLoaderConfig(config, {
      ...baseLessConfig,
      cssModules: false,
      cssLoaderOptions: {
        sourceMap: false,
        importLoaders: 2,
      },
    }),
  });

  config.module.rules.push({
    test: /\.less$/,
    exclude: /node_modules/,
    use: cssLoaderConfig(config, {
      ...baseLessConfig,
      cssModules: true,
      cssLoaderOptions: {
        sourceMap: false,
        importLoaders: 2,
        localIdentName: '[local]--[hash:4]',
      },
    }),
  });

  // disable cssModule for react-quill
  config.module.rules.push({
    test: /quill.snow.css$/,
    include: [/stylesheets/, /node_modules/],
    use: cssLoaderConfig(config, {
      extensions: ['css'],
      cssModules: false,
      cssLoaderOptions: {},
      dev,
      isServer,
    }),
  });

  //
  // SERVER
  if (isServer) {
    const rawExternals = [...config.externals];

    config.externals = [
      // eslint-disable-next-line consistent-return
      (context, request, callback) => {
        if (request.match(ANTD_STYLE_REGX)) {
          return callback();
        }

        if (typeof rawExternals[0] === 'function') {
          rawExternals[0](context, request, callback);
        } else {
          callback();
        }
      },
      ...(typeof rawExternals[0] === 'function' ? [] : rawExternals),
    ];

    config.module.rules.unshift({
      test: ANTD_STYLE_REGX,
      use: 'null-loader',
    });
  }

  if (typeof config === 'function') {
    return config;
  }

  return config;
};
