var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var ementaRouter = require('./routes/ementa');


var app = express();

//connect to mongoDB
const dbURI='mongodb://pawee:pawee@eepaw-shard-00-00.fmmvt.mongodb.net:27017,eepaw-shard-00-01.fmmvt.mongodb.net:27017,eepaw-shard-00-02.fmmvt.mongodb.net:27017/Paw-EE?ssl=true&replicaSet=atlas-132jp3-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result)=> app.listen(4000))
 .catch((err)=> console.log(err));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/ementa',ementaRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
