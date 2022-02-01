require('dotenv').config()

module.exports = {
  env: {
    APP_HOST: process.env.DOMAIN,
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  poweredByHeader: false
}
