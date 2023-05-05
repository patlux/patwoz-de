/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverModuleFormat: 'esm',
  devServerPort: 8004,
  tailwind: true,
  future: {
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_routeConvention: true,
  },
}
