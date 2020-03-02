const prod = process.env.NODE_ENV === 'prod';
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

if(prod) dotenv.config({ path: '/home/ubuntu/application/config/.env' });
else dotenv.config();

const app = express();
const db = require('./src/config/db');
const apiRouter = require('./src/route');

app.disabled('x-powered-by');
app.use(helmet());
app.use( prod ? logger('combined') : logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: prod ? process.env.ROOT : true,
  credentials: true,
}));

app.use('/', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, '페이지를 찾을 수 없습니다.'));
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
