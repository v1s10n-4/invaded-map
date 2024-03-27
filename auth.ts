import { db } from "@/db";
import { Colors } from "@/utils";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import Google from "next-auth/providers/google";

import { NextAuthConfig } from "next-auth";

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
  ],
  basePath: "/auth",
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
