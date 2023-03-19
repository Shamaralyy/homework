

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let db = mongoose.connection;

mongoose.connect('mongodb://localhost/list')
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

var userSchema = new Schema({
    content: {
        type: String,
        require: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;