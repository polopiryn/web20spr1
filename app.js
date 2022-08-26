var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var flash = require('connect-flash')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

const { zadania } = require('./helpers/data')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())


var passport = require('./helpers/passportHelper')
passport(app)


app.use((req, res, next) => {  
  res.locals.redirect = req.query.redirect ? req.query.redirect : ''
  res.locals.activeURL = req.url
  res.locals.zadania = zadania
  next()
})

app.use((req, res, next) => {
  if(req.isAuthenticated()) {
    res.locals.logInfo = `${req.user.username}`
    if(req.url==='/register'
        || req.url.match(new RegExp('^/login','i'))
    ) res.redirect(`/`)  
    else next()
  } else {
    res.locals.logInfo = `Not logged`
    if(req.url.match(new RegExp('^/users/activate', 'i'))
        || req.url.match(new RegExp('^/mail/activation-email', 'i'))
        || req.url.match(new RegExp('^/api', 'i'))
        || req.url==='/register'
        || req.url==='/'
        || req.url==='/session'
        || req.url.match(new RegExp('^/login','i'))
        || req.url==='/users/reset'
    ) next()
    else res.redirect(`/login?redirect=${req.url}`)
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter)

app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
