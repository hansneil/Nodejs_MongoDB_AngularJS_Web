var mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost/cart');
require('./models/cart_model.js');
var Address = mongoose.model('Address'),
    Product = mongoose.model('Product'),
    ProductQuantity = mongoose.model('ProductQuantity'),
    Billing = mongoose.model('Billing'),
    Order = mongoose.model('Order'),
    Customer = mongoose.model('Customer');
function addProduct(customer, order, name, imagefile,
                    price, description, instock){
    var product = new Product({
        name: name,
        imagefile: imagefile,
        description: description,
        price: price,
        instock: instock
    });
    product.save(function(err, results){
        order.items.push(new ProductQuantity({
            quantity: 1,
            product: [product]
        }));
        order.save();
        customer.save();
        console.log('Product ' + name + " Saveed");
    });
}
Product.remove().exec(function(){
    Order.remove().exec(function(){
        Customer.remove().exec(function(){
            var shipping = new Address({
                name: 'Customer A',
                address: 'SomeWhere',
                city: 'My Town',
                state: 'CA',
                zip: '555555'
            });
            var billing = new Billing({
                cardtype: 'Visa',
                name: 'Customer A',
                number: '1029202928374002',
                expiremonth: 1,
                expireyear: 2020,
                address: shipping
            });
            var customer = new Customer({
                userid: 'customerA',
                shipping: shipping,
                billing: billing,
                cart: []
            });
            customer.save(function(err, result){
                var order = new Order({
                    userid: customer.userid,
                    items: [],
                    shipping: customer.shipping,
                    billing: customer.billing
                });
                order.save(function(err, result){
                    addProduct(customer, order, 'Delicate Art Print',
                        'arch.jpg', 12.34,
                        'View of the breathtaking Delicate Arch in Utah',
                        Math.floor((Math.random()*10) + 1));
                    addProduct(customer, order, 'Volcano Print',
                        'volcano.jpg', 45.45,
                        'View of tropical lake backset by a volcano',
                        Math.floor((Math.random()*10) + 1));
                    addProduct(customer, order, 'Tikal Structrue Print',
                        'pyramid.jpg', 38.25,
                        'Look at the amazing arch of early America',
                        Math.floor((Math.random()*10) + 1));
                    addProduct(customer, order, 'Glacial Lake Print',
                        'lake.jpg', 77.45,
                        'Vivide color, crystal clear water',
                        Math.floor((Math.random()*10) + 1));
                });
            });
        });
    });
});