let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// let passport = require('passport');
// let myPassport = require('./config/passport')
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let goodsRouter = require('./routes/goods');
let commentsRouter = require('./routes/comments');
let orderRouter = require('./routes/order');
let userRecRouter = require('./routes/userRec');
let shoppingCartRouter = require('./routes/shoppingCart');
let collectionRouter = require('./routes/collection');
let userwantRouter = require('./routes/userwant');
let payRouter = require('./routes/pay');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(passport.initialize())
// myPassport(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pay', payRouter);
app.use('/goods', goodsRouter);
app.use('/comments', commentsRouter);
app.use('/order', orderRouter);
app.use('/userRec', userRecRouter);
app.use('/shoppingCart', shoppingCartRouter);
app.use('/collection', collectionRouter);
app.use('/userwant', userwantRouter);


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