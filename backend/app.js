const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
// const dotenv = require('dotenv');
const http = require('http');
const https = require('https');
const createError = require('http-errors');
const router = require('./src/route');

require('./db/mongodb.config');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
