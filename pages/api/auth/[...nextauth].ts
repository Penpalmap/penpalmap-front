import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getSession } from "next-auth/react";
import { getUserByEmail } from "../../../api/userApi";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // fetch user data from database
      const userInfos = await getUserByEmail(session.user.email);

      session.user.userId = userInfos.data.user.user_id;
      return session;
    },

    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const createUser = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/register/google`,
            {
              email: user.email,
              name: user.name,
              googleid: user.id,
            }
          );

          if (createUser.data.isAlreadyRegistered) {
            return true;
          }
        } catch (error) {}
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
