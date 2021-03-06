let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let {
  jsonFormat 
} = require('./middlewares')
let {
  baseUrl 
} = require('./config')

let indexRouter = require('./routes/index');
let bookRouter = require('./routes/book');
let fileRouter = require('./routes/file');
var usersRouter = require('./routes/users');


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(baseUrl + '/', jsonFormat)

app.use(baseUrl + '/', indexRouter);
app.use(baseUrl + '/book', bookRouter);
app.use(baseUrl + '/file', fileRouter);
app.use(baseUrl + '/users', usersRouter);


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
