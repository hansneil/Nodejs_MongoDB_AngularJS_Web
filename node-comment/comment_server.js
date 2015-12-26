var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/comments');
require('./models/comments_model.js');
require('./models/photo_model.js');
require('./models/page_model.js');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./comment_routes.js')(app);
app.listen(80);