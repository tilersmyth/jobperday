const fs = require('fs');
const path = require('path');

const lessToJS = require('less-vars-to-js');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const withDotenv = require('./config/next-dotenv.config');
const withAntd = require('./config/next-less.config');

const antdVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './theme/variables.less'), 'utf8'),
);

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withDotenv(
  withAntd({
    cssModules: true,
    cssLoaderOptions: {
      sourceMap: false,
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: antdVariables,
    },
    webpack: config => {
      config.plugins.push(
        new FilterWarningsPlugin({
          // ignore ANTD chunk styles [mini-css-extract-plugin] warning
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        }),
      );

      return config;
    },
  }),
);
