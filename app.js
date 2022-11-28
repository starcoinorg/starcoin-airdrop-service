import createError from "http-errors";
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import getlistRouter from './routes/getlist.js';
import updatestatusRouter from './routes/updatestatus.js';
import projectadmin from "./routes/projectadmin.js";


const app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

app.all('*', function (req, res, next) {
    console.log(req.headers.origin)
    console.log(req.environ)
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
app.use('/', indexRouter);
app.use('/getlist', getlistRouter);
app.use('/updatestatus', updatestatusRouter);
app.use('/uploadProject', projectadmin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = {}//req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app