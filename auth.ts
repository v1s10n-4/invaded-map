import { db, User as DrizzleUser } from "@/db";
import { sessions, users } from "@/db/schema/users";
import { Colors } from "@/utils";
import Discord from "@auth/core/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      created_at: DrizzleUser["created_at"];
      role: DrizzleUser["role"];
    } & DefaultSession["user"];
  }
  interface User {
    created_at: DrizzleUser["created_at"];
    role: DrizzleUser["role"];
  }
}

export const config: NextAuthConfig = {
  theme: {
    colorScheme: "dark",
    brandColor: Colors.primary,
    logo: `${process.env.URL}/icons/ios/128.png`,
  },
  adapter: {
    ...DrizzleAdapter(db),
    async getSessionAndUser(data) {
      const sessionAndUsers = await db
        .select({
          session: sessions,
          user: users,
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId));

      return sessionAndUsers[0] ?? null;
    },
  },
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

export const { handlers, auth, signIn, signOut } = NextAuth(config);
