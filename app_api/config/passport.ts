import passport from 'passport';
import local from 'passport-local';
import User from '../models/user.model';

passport.use(new local.Strategy({
    usernameField: 'email'
  },
  (username, password, done) => {
    User.findOne({ email: username })
      .then((user) => {
        if (!user || !user.validPassword(password)) {
          return done(null, false, {
            message: 'Incorrect username or password'
          });
        }
        return done(null, user);
      })
      .catch((err) => {
        return done(null, false, err);
      })
  }
));
