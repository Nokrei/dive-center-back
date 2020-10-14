const PassportJWT = require("passport-jwt");
const UserModel = require("../models/UserModel");
const JwtStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;

const secret = process.env.SECRET;

// Options for passport-jwt
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

// Function to use this strategy by passport
const initPassportStrategy = (passport) => {
  //Instantiate a strategy for jwt
  const newJwtStrategy = new JwtStrategy(opts, (jwtPayload, done) => {
    UserModel.findById(jwtPayload.id)
      .then((document) => {
        // If user exists, let the user through and send the db document
        if (document) {
          return done(null, document);
          // Otherwise, return false to reject the request to login
        } else {
          return done(null, false);
        }
      })
      .catch((e) => {
        console.log("e", e);
        return done(null, null);
      });
  });
  //Instruct passport to use above strategy
  passport.use(newJwtStrategy);
};

module.exports = initPassportStrategy;
