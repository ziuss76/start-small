import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

declare const global: {
  [key: string]: any;
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
export default clientPromise;

// Nextjs의 경우 개발할 땐 파일저장할 때 마다 자바스크립트 파일들이 재실행되기 때문에
// MongoClient.connect가 동시에 여러개 실행될 수 있습니다. 그럼 DB입출력이 매우 느려짐
// 그걸 방지하고 싶으면 if문으로 "개발중 상태면 global이라는 전역변수 저장소에 보관해주세요" 쓰기
