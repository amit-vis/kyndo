const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const JWTExtract = require('passport-jwt').ExtractJwt;
const User = require('../model/resgister');

const opts = {
    jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY // Ensure this matches the environment variable
};

passport.use("tutor-jwt", new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload._id, isTutor: true });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

passport.use("user-jwt", new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload._id, isTutor: false });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

module.exports = passport;
