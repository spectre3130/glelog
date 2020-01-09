const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../user/user.model');
const Counter = require('../util/counter');
const dotenv = require('dotenv');

dotenv.config();

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.NODE_ENV === 'prod'? process.env.DOMAIN : 'http://localhost:3000'}/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            const user = await User.findOne({ email });
            if(user) {
                return done(null, user);
            } else {
                const seq = await Counter.getNextSequence('user');
                const newUser = User.create({
                    seq,
                    email,
                    username: 'anonymous#'+seq,
                    name: profile.displayName,
                });
                return done(null, newUser);
            }
        } catch(e) {
            console.error(e);
            return done(e);
        }
    }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;