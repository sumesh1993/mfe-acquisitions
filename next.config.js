/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");
const deps = require("./package.json").dependencies;

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.experiments = { topLevelAwait: true };
    config.plugins.push(
      new NextFederationPlugin({
        name: "acquisitions",
        filename: "static/chunks/primaryEntry.js",
        remotes: {
          host: `host@http://localhost:3000/_next/static/${
            isServer ? "ssr" : "chunks"
          }/primaryEntry.js`,
        },
        exposes: {
          "./ctwa": "./pages/ctwa.tsx",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
