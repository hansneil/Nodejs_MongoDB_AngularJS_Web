/*
 *  定义购物车模型
 *      [购物车]: 顾客 产品 订单账单 发货数据
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//地址模型，用于发货信息和账单信息的一部分
var AddressSchema = new Schema({
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String
}, {_id: false}); //禁止id自动分配，因为并不需要根据ID查找地址
mongoose.model('Address', AddressSchema);
//账单模型：跟踪信用卡信息和账单信息
var BillingSchema = new Schema({
    carttype: {type: String, enum: ['Visa', 'MasterCard', 'Amex']},
    name: String,
    number: String,
    expiremonth: Number,
    expireyear: Number,
    address: [AddressSchema]
}, {_id: false});
mongoose.model('Billing', BillingSchema);
//产品模型：存储产品信息的模型
var ProductSchema = new Schema({
    name: String,
    imagefile: String,
    description: String,
    price: Number,
    instock: Number
});
mongoose.model('Product', ProductSchema);
//数量模型
var ProductQuantitySchema = new Schema({
    quantity: Number,
    product: [ProductSchema]
}, {_id: false});
mongoose.model('ProductQuantity', ProductQuantitySchema);
//订单模型
var OrderSchema = new Schema({
    userid: String,
    items: [ProductQuantitySchema],
    shipping: [AddressSchema],
    billing: [BillingSchema],
    status: {type: String, default: "Pending"},
    timestamp: {type: Date, default: Date.now}
});
mongoose.model('Order', OrderSchema);
//顾客模型
var CutsomerSchema = new Schema({
    userid: {type: String, unique: true, required: true},
    shipping: [AddressSchema],
    billing: [BillingSchema],
    cart: [ProductQuantitySchema]
});
mongoose.model('Customer', CutsomerSchema);