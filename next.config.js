/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/app',
  sw: 'service-worker.js',
});

module.exports = withPWA({
  // next.js config
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'sounds/[name].[ext]',
            publicPath: '/_next/static/sounds/',
            outputPath: 'static/sounds/',
            esModule: false,
          },
        },
      ],
    });

    return config;
  },
});
