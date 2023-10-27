const createError = require('http-errors');
const express = require('express');
const http2Express = require('http2-express-bridge');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = http2Express(express);
app.use(cors(
    {
        origin: '*'
    }
));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* middle ware */
app.all('/api/*', async (req, res, next) => {
    let url = req.url;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
    /* 
        url의 요청이 login이 아니라면
        사용자가 추가한 authorization의 jwt token 값의 유효성을 검사한다.
    */
    if(url != '/api/user/login') {
        let token = req.headers.authorization;
        let resJwt = await jwtFunc.verify(token);
        if(!resJwt) {
            return res.json({
                success: 0,
                isLogged: false,
                message: CRT_ERROR_CODE["LOGIN_TOKEN"],
            });
        }
        req.self = resJwt;  // 에러가 없는 경우 req 인자에 self 필드를 추가합니다.
    }
    next(); // 사용자가 요청한 end-point로 전송합니다.
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
