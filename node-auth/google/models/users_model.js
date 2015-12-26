/**
 *  首要事情：定义将被存储在数据库中的对象模型
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: {type: String, unique: true},
    email: String,
    color: String,
    hashed_password: String
});
mongoose.model('User', UserSchema);