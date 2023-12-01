/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'esm',
  serverMinify: process.env.NODE_ENV === 'production',
  tailwind: true,
  dev: {
    port: 8002,
  },
};
