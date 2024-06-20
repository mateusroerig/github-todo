import NextAuth, { NextAuthConfig, User, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user?.image) {
        session.user.id = session.user.image
          ?.replace("https://avatars.githubusercontent.com/u/", "")
          .replace("?v=4", "");
      }
      // Add property to session, like an access_token from a provider
      return { ...session, accessToken: token.accessToken };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
