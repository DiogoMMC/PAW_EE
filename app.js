var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var methodOverride = require("method-override");

// routers
// authentication
var registerRouter = require('./routes/auth/register');
var loginRouter = require('./routes/auth/login');
var logoutRouter = require('./routes/auth/logout');
// admin
var adminRouter = require('./routes/admin');
// geral
var homeRouter = require('./routes/home');
var menuRouter = require('./routes/menu');
var aboutRouter = require('./routes/about');
// clientes
var reservationsRouter = require('./routes/reservations');


var app = express();

//connect to mongoDB
const dbURI = 'mongodb://pawee:pawee@eepaw-shard-00-00.fmmvt.mongodb.net:27017,eepaw-shard-00-01.fmmvt.mongodb.net:27017,eepaw-shard-00-02.fmmvt.mongodb.net:27017/Paw-EE?ssl=true&replicaSet=atlas-132jp3-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"))
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));

// middleware to make 'user' available to all templates
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.admin = req.session.admin;
  //
  res.locals.error = req.session.error;
  res.locals.success = req.session.success;
  req.session.error = null;
  req.session.success = null;
  next();
});

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Por favor faça login novamente."
    res.redirect('/login');
  }
}

// authentication
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
// general routes
app.use('/', homeRouter);
app.use('/menu', menuRouter);
app.use('/about', aboutRouter);
// client routes
app.use('/reservations', restrict, reservationsRouter);
// admin routes
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
