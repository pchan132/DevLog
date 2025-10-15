import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

//////////////////////// Google Provider //////////////////////////////////
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
}
//////////////////////////////////////////////////////////////////////////

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
        // 1. ค้นหาผู้ใช้ในฐานข้อมูล
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 2. ตรวจสอบก่อนว่า user ที่หาเจอ "มีรหัสผ่านหรือไม่"
        // ถ้าไม่มี user หรือ user ไม่มี password (ซึ่งหมายความว่าสมัครมาจาก Google)
        // ให้บอกว่าข้อมูลไม่ถูกต้องทันที โดยไม่ต้องไปเช็ค bcrypt
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        // 3. ถ้า user มีรหัสผ่าน ถึงจะนำมาเปรียบเทียบ
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password // ณ จุดนี้ เรามั่นใจได้ว่า user.password ไม่ใช่ null
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    //----------------------------------------------------------
    ///--------------- Google ----------------------------------
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    //----------------------------------------------------------
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
        session.user.image = token.picture;
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
