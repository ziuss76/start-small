import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URL;

let connectDB: Promise<MongoClient> | undefined = undefined;

if (process.env.NODE_ENV === 'development') {
  if (!(global as { _mongo?: Promise<MongoClient> })._mongo) {
    (global as { _mongo?: Promise<MongoClient> })._mongo = new MongoClient(
      url!
    ).connect();
  }
  connectDB = (global as { _mongo?: Promise<MongoClient> })._mongo;
} else {
  connectDB = new MongoClient(url!).connect();
}
export { connectDB };

// Nextjs의 경우 개발할 땐 파일저장할 때 마다 자바스크립트 파일들이 재실행되기 때문에
// MongoClient.connect가 동시에 여러개 실행될 수 있습니다. 그럼 DB입출력이 매우 느려짐
// 그걸 방지하고 싶으면 if문으로 "개발중 상태면 global이라는 전역변수 저장소에 보관해주세요" 쓰기
