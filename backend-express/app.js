const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const indexRouter = require(`./routes/index.router`);
// const apiRouter = require(`./routes/api/api.router`);
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let JsonWebToken = require('./utils/jwt');
app.use(async (req, res, next) => {
    let url = req.originalUrl;
    if (url.includes('/api') == true) {
        let auth = req.headers['authorization'];
        // header에 등록된 token이 없을 때 401 반환
        if (!auth) { return res.sendStatus(401); }

        let token = auth.split(" ")[1];
        let jwt = new JsonWebToken();
        let data = await jwt.Verify(token);
        if (data.success == 0) { return res.sendStatus(401); }
        req['_self'] = data.decoded;
        next();
    } else {
        next();
    }
});

// app.use('/', require(`./controller/company/user/get.controller`));
// app.use('/', require(`./controller/user/workSpace/get.controller`));
// app.use('/', require(`./controller/okr/get.controller`));
app.use('/', require(`./routes/index.router`));

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//     next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
