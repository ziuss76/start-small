/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public', // next build시 public 폴더에 sw.js를 생성
  disable: process.env.NODE_ENV === 'development', // 개발환경에서도 service worker를 사용함 (false : GenerateSW has been called multiple times 에러가 뜨지만 sw 관련 개발중일 때는 필요)
  skipWaiting: true, // sw.js가 변경되면 새로운 service worker가 활성화되기 전까지 기존의 service worker가 제어권을 유지하도록 설정
  customWorkerDir: 'public/swCustomDir',
  buildExcludes: ['app-build-manifest.json'], // bad-precaching-response 에러 해결 (빌드 시 임시적으로 생성되고 삭제되는 파일)
});

module.exports = withPWA({
  // next.js config
  // Image 컴포넌트가 외부 URL(구글로그인)에서 이미지를 로드하기
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
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
