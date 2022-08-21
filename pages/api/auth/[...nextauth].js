import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
// import Auth0Provider from "next-auth/providers/auth0"
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
//
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "../../../app/services/mongodb";

export default async function handle(req, res) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  // https://next-auth.js.org/configuration/options
  return await NextAuth(req, res, {
    // provider config options
    // https://next-auth.js.org/configuration/providers/oauth#options
    providers: [
      // EmailProvider({
      //   server: {
      //     host: process.env.EMAIL_SERVER_HOST,
      //     port: process.env.EMAIL_SERVER_PORT,
      //     auth: {
      //       user: process.env.EMAIL_SERVER_USER,
      //       pass: process.env.EMAIL_SERVER_PASSWORD,
      //     },
      //   },
      //   from: process.env.EMAIL_FROM,
      // }),
      //
      // // Temporarily removing the Apple provider from the demo site as the
      // // callback URL for it needs updating due to Vercel changing domains
      // Providers.Apple({
      //   clientId: process.env.APPLE_ID,
      //   clientSecret: {
      //     appleId: process.env.APPLE_ID,
      //     teamId: process.env.APPLE_TEAM_ID,
      //     privateKey: process.env.APPLE_PRIVATE_KEY,
      //     keyId: process.env.APPLE_KEY_ID,
      //   },
      // }),
      //
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
      // Auth0Provider({
      //   clientId: process.env.AUTH0_ID,
      //   clientSecret: process.env.AUTH0_SECRET,
      //   issuer: process.env.AUTH0_ISSUER,
      // }),
      //
      // The Credentials provider can only be used if JSON Web Tokens are enabled for sessions.
      //   .adapter option sets strategy to "database"
      // Users authenticated with the Credentials provider are not persisted in the database.
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "user@email.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const DB = {
            1: {
              id: 1,
              name: "J",
              email: "j@example.com",
              image: "http://localhost:3000/pic-j",
            },
            2: {
              id: 2,
              name: "K",
              email: "k@example.com",
              image: "http://localhost:3000/pic-k",
            },
          };
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          // const res = await fetch("/your/endpoint", {
          //   method: "POST",
          //   body: JSON.stringify(credentials),
          //   headers: { "Content-Type": "application/json" },
          // });
          // const user = await res.json();
          return new Promise((resolve, _reject) => {
            const user =
              DB[
                Object.keys(DB).find(
                  (key) => credentials.email === DB[key].email
                )
              ];
            resolve(user || null);
          });

          // If no error and we have user data, return it
          // if (res.ok && user) {
          //   return user;
          // }
          // // Return null if user data could not be retrieved
          // return null;
        },
      }),
    ],
    //
    // theme: {
    //   colorScheme: "auto", // "auto" | "dark" | "light"
    //   brandColor: "", // Hex color code
    //   logo: "", // Absolute URL to image
    // },
    //
    // // https://next-auth.js.org/configuration/callbacks
    // // https://next-auth.js.org/getting-started/example#using-nextauthjs-callbacks
    callbacks: {
      // async signIn({ user, account, profile, email, credentials }) {
      //   return true;
      // },
      // async redirect({ url, baseUrl }) {
      //   return baseUrl;
      // },
      session: ({ session, user, token }) => {
        session.user.uid = token.sub;
        return session;
      },
      // jwt: ({ token, user, account, profile, isNewUser }) => {
      //   return token;
      // },
    },
    //
    // pages: {
    //   signIn: "/auth/signin",
    //   signOut: "/auth/signout",
    //   error: "/auth/error", // Error code passed in query string as ?error=
    //   verifyRequest: "/auth/verify-request", // (used for check email message)
    //   newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    // },
    //
    // database: {
    //   type: 'process.env.DATABASE_TYPE',
    //   host: 'process.env.DATABASE_HOST',
    //   port: 'process.env.DATABASE_PORT',
    //   username: 'process.env.DATABASE_USERNAME',
    //   password: 'process.env.DATABASE_PASSWORD',
    //   database: 'process.env.DATABASE_NAME',
    //   synchronize: true,
    // },
    //
    // secret: "@nextauth_secret_122333",
    //
    // session: {
    //   // Choose how you want to save the user session.
    //   // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    //   // If you use an `adapter` however, we default it to `"database"` instead.
    //   // You can still force a JWT session by explicitly defining `"jwt"`.
    //   // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    //   // which is used to look up the session in the database.
    //   //   .. "database" | "jwt"
    //   strategy: "database",

    //   // Seconds - How long until an idle session expires and is no longer valid.
    //   maxAge: 30 * 24 * 60 * 60, // 30 days

    //   // Seconds - Throttle how frequently to write to database to extend a session.
    //   // Use it to limit write operations. Set to 0 to always update the database.
    //   // Note: This option is ignored if using JSON Web Tokens
    //   updateAge: 24 * 60 * 60, // 24 hours
    // },
    //
    // // https://next-auth.js.org/adapters/overview
    // adapter: MongoDBAdapter(clientPromise),
    //
    // events: {
    //   async signIn(message) {
    //     /* on successful sign in */
    //   },
    //   async signOut(message) {
    //     /* on signout */
    //   },
    //   async createUser(message) {
    //     /* user created */
    //   },
    //   async updateUser(message) {
    //     /* user updated - e.g. their email was verified */
    //   },
    //   async linkAccount(message) {
    //     /* account (e.g. Twitter) linked to a user */
    //   },
    //   async session(message) {
    //     /* session is active */
    //   },
    // },
    //
    // debug: true,
    //
    // logger: {
    //   error(code, metadata) {
    //     log.error(code, metadata);
    //   },
    //   warn(code) {
    //     log.warn(code);
    //   },
    //   debug(code, metadata) {
    //     log.debug(code, metadata);
    //   },
    // },
  });
}
