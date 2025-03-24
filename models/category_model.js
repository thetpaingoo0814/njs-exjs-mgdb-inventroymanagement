const mongoose = require('mongoose');
const {Schema} = mongoose;

const CategorySchema = new Schema({
    name:{type:String,require:true,unique:true},
    image:{type:String,require:true}
});

const Category = mongoose.model('categories',CategorySchema);

module.exports = Category;