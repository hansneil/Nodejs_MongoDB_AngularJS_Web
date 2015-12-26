var crypto = require('crypto'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'); //创建一个新的User对象
function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
exports.signup = function(req, res) {
    var user = new User({username: req.body.username});
    console.log(req.body);
    user.set('hashed_password', hashPW(req.body.password));
    user.set('email', req.body.email);
    user.save(function(err){ //将新创建的用户对象保存在数据库中
        if (err) {
            req.session.error = err;
            req.session.msg = "Username Exists, Please log in or use another name !";
            res.redirect('/signup');
        } else {
            req.session.user = user.id;  //用户保存成功后，MongoDB创建的ID被保存在req.session.user中
            req.session.username = user.username;
            req.session.msg = "Authenticated as " + user.username;
            res.redirect('/');
        }
    });
};
exports.login = function(req, res) {
    User.findOne({username: req.body.username})
        .exec(function(err, user) {
            if (!user) {
                console.log('User not found');
                err = 'User Not Found';
            } else if (user.hashed_password === hashPW(req.body.password.toString())) {
                console.log('Haha success');
                req.session.regenerate(function(){
                    req.session.user = user.id;
                    req.session.username = user.username;
                    req.session.msg = 'Authenticated as ' + user.username;
                    res.redirect('/');
                });
            } else {
                err = 'Authentication failed';
            }
            if (err) {
                req.session.regenerate(function(){
                    req.session.msg = err;
                    res.redirect('/login');
                });
            }
        });
};
exports.getUserProfile = function(req, res) {
    User.findOne({_id: req.session.user})
        .exec(function(err, user){
            if (!user) {
                res.json(404, {err: 'User Not Found'});
            } else {
                res.json(user);
            }
        });
};
exports.updateUser = function(req, res) {
    User.findOne({_id: req.session.user})
        .exec(function(err, user){
            user.set('email', req.body.email);
            user.set('color', req.body.color);
            user.save(function(err){
                if (err) {
                    res.sessor.error = err;
                } else {
                    req.session.msg = "User Updated";
                }
                res.redirect('/user');
            });
        });
};
exports.deleteUser = function(req, res) {
    User.findOne({_id: req.session.user})
        .exec(function(err, user){
            if (user) {
                user.remove(function(err) {
                    if (err) {
                        req.session.msg = err;
                    }
                    req.session.destroy(function() {
                        res.redirect('/login');
                    });
                });
            } else {
                req.session.msg = "User Not Found";
                req.session.destroy(function(){
                    res.redirect('/login');
                })
            }
        });
};