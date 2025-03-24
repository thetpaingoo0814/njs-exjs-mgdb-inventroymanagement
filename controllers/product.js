const productDB = require('../models/product_model');
const {Msg} = require('../utils/core')

//Form Data (image + data)
//JSON
const add = async(req,res,next) => {
    req.body.user = req.userId;
    req.body.colors = JSON.parse(req.body.colors);
    req.body.tags = JSON.parse(req.body.tags);
    req.body.shipping = JSON.parse(req.body.shipping);

    let product = await new productDB(req.body).save();
   Msg(res,"Product Added!", product);
}

module.exports = {
    add
}