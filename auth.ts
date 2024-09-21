import { db, User as DrizzleUser } from "@/db";
import {
  accounts as accountsTable,
  authenticators as authenticatorsTable,
  sessions as sessionsTable,
  users as usersTable,
  verificationTokens as verificationTokensTable,
} from "@/db/schema/users";
import { Colors } from "@/utils";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import { Novu } from "@novu/node";
import { ISubscriberPayload } from "@novu/node/build/main/lib/subscribers/subscriber.interface";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DrizzleUser & DefaultSession["user"];
  }
  interface User {
    created_at: DrizzleUser["created_at"];
    role: DrizzleUser["role"];
    referrer_link_id: DrizzleUser["referrer_link_id"];
  }
}
const novu = new Novu(process.env.NOVU_SECRET_KEY!);

const config: NextAuthConfig = {
  theme: {
    colorScheme: "dark",
    brandColor: Colors.primary,
    logo: `${process.env.URL}/icons/ios/128.png`,
  },
  adapter: DrizzleAdapter(db, {
    usersTable,
    accountsTable,
    sessionsTable,
    verificationTokensTable,
    authenticatorsTable,
  }),
  events: {
    signIn: async ({ user, isNewUser, profile, account }) => {
      if (!user.id) return;
      const novuUserData: ISubscriberPayload = {
        email: user.email || undefined,
        avatar: user.image || undefined,
        data: {
          role: user.role,
          created_at: new Date(user.created_at).toISOString(),
          referrer_link_id: user.referrer_link_id || undefined,
        },
      };
      await novu.subscribers.identify(user.id, novuUserData);
    },
  },
  trustHost: true,
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
    signOut: "/map",
    newUser: "/welcome",
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
