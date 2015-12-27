var mongoose = require('mongoose'),
    Product = mongoose.model('Product');   //如果model未指定Schema对象，则只是访问编译后的Model对象
exports.getProduct = function(req, res){
    Product.findOne({_id: req.query.productId})
        .exec(function(err, product){
            if (!product) {
                res.json(404, {msg: 'Product Not Found'});
            } else {
                res.json(product);
            }
        });
};
exports.getProducts = function(req, res){
    Product.find()
        .exec(function(err, products){
            if (!products) {
                res.json(404, {msg: 'Products Not Found'});
            } else {
                res.json(products);
            }
        });
};