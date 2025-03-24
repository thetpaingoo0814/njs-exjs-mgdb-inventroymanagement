const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{type:String,require:true, unique:true},
    phone:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    type:{type:String,enum:["Buyer","Seller"],default:"Buyer"},
    unit:{type:Schema.Types.Int32, default:0},
    created:{type:Date, default:Date.now}
});

const User = mongoose.model('users',UserSchema);

module.exports = User;