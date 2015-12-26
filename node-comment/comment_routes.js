var express = require('express');
module.exports = function(app) {
    var photos = require('./controllers/photos_controller'),
        comments = require('./controllers/comment_controllers'),
        pages = require('./controllers/pages_controller');
    app.use('/static', express.static('./static'));
    app.use('/images', express.static('./images'));
    app.use('/lib', express.static('./lib'));

    app.get('/', function(req, res){
        res.render('photos');
    });
    app.get('/photos', photos.getPhotos);
    app.get('/photo', photos.getPhoto);
    app.get('/page', pages.getPage);
    app.get('/comments/get', comments.getComment);
    app.post('/comments/add', comments.addComment);
}