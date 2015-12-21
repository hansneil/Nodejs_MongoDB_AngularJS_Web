/**
 * 实现Express Web服务器
 * 一般流程： 请求必要的模块 -- 链接到mongoDB数据库 -- 配置Express服务器 -- 启动监听
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    mongoStore = require('connect-mongo')({session: expressSession}),
    mongoose = require('mongoose');
//确保User模式在Mongoose中注册
require('./models/users_model.js');
var conn = mongoose.connect('mongodb://localhost/myapp'),
    app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 60*60*1000},
    store: new mongoStore({
        db: mongoose.connect.db,
        connection: 'session'
    })
}));
require('./routes')(app); //添加从./routes到服务器的路由
app.listen(80);