const catDB = require('../models/category_model');
const {Msg} = require('../utils/core');
const {deleteImageByLink} = require('../utils/gallery');

const all = async (req,res,next) => {
        let categories = await catDB.find();
        Msg(res,"All Categories", categories)
}
const getById = async (req,res,next) => {
        let cat = await catDB.findById(req.params.id);
        if(cat){
            Msg(res,"Single Category",cat);
        }else{
            next(new Error("No Category with that id!"));
        }
}

const add = async (req,res,next) => {
        let dbCat = await catDB.findOne({name:req.body.name});
        if(dbCat){
            next(new Error("Category with that name is already in use"))
        }else{
            let saveCat = await new catDB(req.body).save();
            Msg(res,"Category saved!",saveCat);
       }
}

const modify = async (req,res,next) => {
        let dbCat = await catDB.findById(req.params.id);
        if(dbCat){
            let oldCat = await catDB.findByIdAndUpdate(dbCat._id, req.body);
            Msg(res,"Category Updated!",oldCat);
        }else{
            next(new Error("No Category with that ID"));
        }
}
const drop = async (req,res,next) => {
    try{
        let dbCat = await catDB.findById(req.params.id);
        if(dbCat){
            await deleteImageByLink(dbCat.image);
            let cat = await catDB.findByIdAndDelete(dbCat._id);
            Msg(res,"Category Dropped", cat);
        }else{
            next(new Error("No Category with that ID"));
        }
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    all,
    getById,
    add,
    modify,
    drop
}