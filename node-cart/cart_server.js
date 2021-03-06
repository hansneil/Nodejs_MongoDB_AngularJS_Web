var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/cart');
require('./models/cart_model.js');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('./cart_routes')(app);
app.listen(80);