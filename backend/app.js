const express = require('express');
const http = require('http');
const https = require('https');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const db = require('./src/config/db');
const jwtProvider = require('./src/auth/jwt.provider');
const authRouter = require('./src/auth/auth.route');
const apiRouter = require('./src/route');

dotenv.config();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', jwtProvider.authenticate);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  const code = err.status || 500;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).json({ code, message: err.message });
});

module.exports = app;
