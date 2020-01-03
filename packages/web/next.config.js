const env = require('./tools/next/next-dotenv');
const withWebpack = require('./tools/next/next-webpack');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

const nextConfig = {
  env,
  target: 'server',
};

module.exports = withBundleAnalyzer({ ...nextConfig, webpack: withWebpack });
