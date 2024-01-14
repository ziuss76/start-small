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
  images: {
    domains: ['lh3.googleusercontent.com'], // Image 컴포넌트가 외부 URL(구글로그인)에서 이미지를 로드하기
  },

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
