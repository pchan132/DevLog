import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "password", type: "password" },
      },
      ///////////////////////////////////////////////////////////////////////////
      async authorize(credentials) {
        // ตัวสอบข้อมูล ----------------------------------------------
        if (!credentials) return null;
        // ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // ตัวสอบข้อมูล กับ รหัส --------------------------------------
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  /////////////////////////////////////////////////////////////////////////////////
  adapter: PrismaAdapter(prisma),
  // ------------------------------------
  session: {
    strategy: "jwt",
  },
  //-------------------------------------
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  //------------------------------------
  pages: {
    signIn: "/auth/signin",
  },
  //------------------------------------
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
