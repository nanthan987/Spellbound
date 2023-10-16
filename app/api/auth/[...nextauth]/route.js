import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkLogin } from "@/utils/authUtils";

const handler = NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await checkLogin(credentials);
        if (user) {
          return user;
        } else return null;
      },
    }),
  ],
  pages: {
    signIn: "/authentication/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    debug: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// References:
// https://next-auth.js.org/configuration/options
// https://next-auth.js.org/providers/credentials
