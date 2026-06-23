import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { User } from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },

    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value });
        if (!user) {
          user = await User.create({
              name: profile.displayName,
              email: profile.emails?.[0].value,
              password: "GOOGLE_AUTH_USER",
            });
        }
        done(null, user);
      } catch (error) {
        done(error as Error);
      }
    }));

passport.serializeUser(
  (user: any, done) => {
    done(null, user.id);
  }
);

passport.deserializeUser(
  async (id, done) => {

    const user =
      await User.findById(id);

    done(null, user);

  }
);

export default passport;