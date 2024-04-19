import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import catRouter from './app_api/routes/cat.routes';
import userRouter from './app_api/routes/user.routes';
import passport from 'passport';
require('dotenv').config({ path: __dirname + '/.env' });
require('./app_api/models/_db');
require('./app_api/config/passport');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(function(req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
})
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'dist', 'app_public', 'browser')));
app.use(passport.initialize());

app.use('/api/cat', catRouter);
app.use('/api/user', userRouter);

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  if (req.path.indexOf('localhost:3000/api') !== -1) {
    res.sendFile(path.join(__dirname, 'app_public', 'dist', 'app_public', 'browser', 'index.html'));
  }
  else {
    next();
  }
});


// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
