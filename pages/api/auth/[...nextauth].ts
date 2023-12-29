import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '../../../util/db';
import type { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: MongoDBAdapter(
    clientPromise
  ) as unknown as import('next-auth/adapters').Adapter,
};

export default NextAuth(authOptions);

// 외부 라이브러리 next-auth 에서 pages 폴더에 만들라고 했기 때문에 app 폴더에 만들지 않았음.
