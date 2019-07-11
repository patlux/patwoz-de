const withCss = require('@zeit/next-css');

module.exports = withCss({
  target: 'serverless',
  env: {
    // for `now dev`
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
  },
});
