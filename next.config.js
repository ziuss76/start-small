/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public', // next build시 public 폴더에 service-worker.js를 생성
  // disable: process.env.NODE_ENV === 'development', // 개발환경에서는 PWA를 사용하지 않음
  register: true, // service-worker 자동 등록
  scope: '/app', // PWA가 적용될 경로
  sw: 'service-worker.js',
});

module.exports = withPWA({
  // next.js config
  images: {
    domains: ['lh3.googleusercontent.com'], // Image 컴포넌트가 외부 URL(구글로그인)에서 이미지를 로드하기
  },

  webpack(config, options) {
    config.module.rules.push({
      // mp3 파일을 빌드할 수 있도록 설정
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
