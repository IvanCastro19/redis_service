// app.js

import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import createError from 'http-errors';
import routes from './routes/index';
import logging from './config/log/logging';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//logging
app.use((req, res, next) => {
  logging.warn(
    "SERVER",
    `METHOD->[${req.method}], URL->[${req.url}] IP->[${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logging.warn(
      "SERVER",
      `METHOD->[${req.method}], URL->[${req.url}] IP->[${req.socket.remoteAddress}] STATUS->[${res.statusCode}]`
    );
  });

  next();
});

//Routes
app.use('/v1', routes);
app.get('/v1', (req, res) => {
  res.send("it work")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err: any, req: express.Request, res: express.Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.status);
});

export default app;
