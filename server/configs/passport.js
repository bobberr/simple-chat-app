const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtSecret = require('./jwt').config.jwtsecret;
const jwtSession = require('./jwt').config.jwtSession;
const passport = require('passport');

module.exports = () => {
    var opts = {
        jwtFromRequest: ExtractJwt.fromHeader('token'),
        secretOrKey: jwtSecret
    };
    const strategy = new JwtStrategy(opts, (payload, done) => {
        User.findOne({'local.email': payload.email}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false, 'no such user');
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: (req, res, next) => {
            return passport.authenticate('jwt', jwtSession, (err, user, info) => {
                if (info) {
                    res.json({unauth: true})
                } else {
                    next();
                }
            })(req, res, next);
        }
    };
};


