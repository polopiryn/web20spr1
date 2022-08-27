var express = require('express');
var router = express.Router();
var passport = require('passport')
var sha1 = require('sha1')
var router = express.Router()
var { User } = require('../helpers/dbHelper')


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', (req, res) => {
  var error = req.flash('error')
  var send = {
    title: "Login"
  }
  if(req.query.redirect && req.query.redirect != '/')
    send.info = "You need to be logged to see this content " + req.query.redirect
  if(error.length > 0) send.error = error
  res.render('login', send)
})

router.post('/login', (req, res, next) => passport.authenticate('local', {
  session: true,
  successRedirect: req.query.redirect ? req.query.redirect : '/',
  failureRedirect: `/login?redirect=${req.query.redirect ? req.query.redirect : ''}`,
  failureFlash : true
})(req, res, next))

router.get('/register', (req, res) => {
  res.render('register', { title: "Registration" })
})

router.post('/register', (req, res) => {
  if(req.body.username && req.body.password && req.body.email) {
    new User({
      username : req.body.username,
      password: sha1(req.body.password),
      admin: false,
      active: false,
      email: req.body.email
    }).save((err, data) => {
      if(err) res.render('register', {
        error: err.errmsg.match(new RegExp('username_1 duplicated key', 'i'))
                  ? "Username is already taken"
                  : err.errmsg.match(new RegExp('email_1 duplicated key', 'i'))
                        ? "Email address is already taken"
                        : "Internal server error",
        username: req.body.username,
        email: req.body.email
      })
      else res.redirect(`/mail/activation-email/${data._id}`)
    })
  } else res.render('register', {
    error: 'All fields are required to pass registraion process',
    username: req.body.username,
    email: req.body.email
  })
})

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
       console.log(err); 
    }
    res.redirect('/');
})})

router.get('/session', (req, res, next) => {
  if(req.session.odwiedziny)
    req.session.odwiedziny++
  else
    req.session.odwiedziny = 1
  var dane = {
    idSesji: req.session.id,
    odwiedziny: req.session.odwiedziny,
    ciasteczko: req.session.cookie,
    data: req.session.cookie.data,
    passport: req.session.passport
  }
  res.render('session', dane)
})

router.get('/logged', (req, res) => {
  var dane = {
    user: req.user,
    passport: req.session.passport,
    log_info: res.locals.logInfo
  }
  res.render('logged', dane)
})


module.exports = router;
