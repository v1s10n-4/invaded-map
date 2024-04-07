import { db, User as DrizzleUser } from "@/db";
import { CustomDrizzleAdapter } from "@/db/auth/adapter";
import { Colors } from "@/utils";
import Discord from "next-auth/providers/discord";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: DrizzleUser["name"];
      created_at: DrizzleUser["created_at"];
      role: DrizzleUser["role"];
    } & DefaultSession["user"];
  }
  interface User {
    created_at: DrizzleUser["created_at"];
    role: DrizzleUser["role"];
  }
}

const config: NextAuthConfig = {
  theme: {
    colorScheme: "dark",
    brandColor: Colors.primary,
    logo: `${process.env.URL}/icons/ios/128.png`,
  },
  adapter: CustomDrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  basePath: "/auth",
  pages: {
    signIn: "/signin",
    error: "/auth-error",
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
        created_at: user.created_at,
      },
    }),
  },
};

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: updateUser,
} = NextAuth(config);
