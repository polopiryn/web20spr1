const session = require('express-session')
const { User } = require('./dbHelper')
const passport = require('passport')
LocalStrategy = require('passport-local').Strategy

module.exports = app => {

  app.use(session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use(new LocalStrategy({
    passReqToCallback : true
  }, (req, username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if(err) return done(err)
        if(!user) {
          return done(null, false, { message: 'Invalid user credentials' })
        }
        if(!user.validPassword(password)) {
          return done(null, false, { message: 'Invalid user credentials' })
        }
        if(!user.active) {
          return done(null, false, { message: `Account is not active` })
        }
        return done(null, user)
      })
    }
  ))
  
}
