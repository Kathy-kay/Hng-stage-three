import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
        },
      },

      async authorize(credentials) {
        const users = [
          {
            id: 33,
            email: "user@example.com",
            password: "1Password",
          },
        ];
        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],

  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
