const mongoose = require('mongoose')
const sha1 = require('sha1')

mongoose.connect(
    'mongodb+srv://BarWoj:zaq1%40WSX@cluster0.tzbes.mongodb.net/test',
    err => console.log(err ? 'db connection failed' : 'db connection successfull', err ? err : '')
)

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, required: true, default: false }
})

userSchema.methods.validPassword = function(pass) {
    return sha1(pass) == this.password
}
  
var houseSchema = new mongoose.Schema({
    name : { type: String, required: true, unique: true },
    city : { type: String, required: true },
    address : { type: String, required: true },
    houseSize : { type: Number, required: true },
    price : { type: Number, required:true },
})
  
module.exports = {
    User : mongoose.model('user', userSchema),
    House : mongoose.model('house', houseSchema)
}
