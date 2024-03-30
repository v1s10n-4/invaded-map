import { db } from "@/db";
import { Colors } from "@/utils";
import Google from "next-auth/providers/google";
import Discord from "@auth/core/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";

export const config: NextAuthConfig = {
  theme: {
    colorScheme: "dark",
    brandColor: Colors.primary,
    logo: `${process.env.URL}/icons/ios/128.png`,
  },
  adapter: DrizzleAdapter(db),
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
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
