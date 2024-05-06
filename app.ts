import createError, { HttpError } from 'http-errors';
import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import visitorRouter from './app_api/src/routes/visitor.routes';
import userRouter from './app_api/src/routes/user.routes';
import passport from 'passport';
require('dotenv').config({ path: __dirname + '/.env' });
require('./app_api/src/models/_db');
require('./app_api/src/config/passport');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS', // Explicitly allow methods
  allowedHeaders: 'Content-Type, Authorization', // Explicitly allow headers
  credentials: true, // If you're using credentials
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Apply CORS middleware with options

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public', 'dist', 'app_public', 'browser')));
app.use(passport.initialize());

app.use('/api/visit', visitorRouter);
app.use('/api/user', userRouter);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'app_public', 'dist', 'app_public', 'browser', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
