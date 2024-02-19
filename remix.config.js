/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  tailwind: true,
  postcss: true,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  esbuild: {
    plugins: [
      {
        name: 'alias-events',
        setup(build) {
          build.onResolve({ filter: /^events$/ }, () => {
            return { path: require.resolve('./shims/events.js') };
          });
        },
      },
    ],
  },
};
