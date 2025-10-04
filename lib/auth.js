import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@/utils/hash";
import prisma from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // Validate credentials exist
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // Find user in DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No user found with this email");

        if (!user.password)
          throw new Error("This account uses a social login provider");

        // Compare password
        const isValid = await comparePassword(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        // Return user object
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login", // use your custom login page
  },

  session: {
    strategy: "jwt", // store sessions in JWT (simpler)
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
};
