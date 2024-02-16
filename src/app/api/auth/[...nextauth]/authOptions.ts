import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/../util/db';
import type { NextAuthOptions } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
};

export default authOptions;
