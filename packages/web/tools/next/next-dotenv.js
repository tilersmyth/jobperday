const _ = require('lodash');
const path = require('path');
const dotenv = require('dotenv-safe');

const dev = process.env.NODE_ENV !== 'production';
const rootPath = path.resolve(__dirname, '../../');

const dotEnvPath = dev ? `${rootPath}/.env` : `${rootPath}/.env.production`;

dotenv.config({ path: dotEnvPath });

module.exports = {
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};
