const {Msg,Encoder,Token} = require('../utils/core');
const userDB = require('../models/user_model');
const {setCacheUser} = require('../utils/caches');


//level 1
const register1 = async(req,res,next)=>{
    let name = req.body.name;
    let phone = req.body.phone;
    let password = req.body.password;

    try{
        let dbName = await userDB.findOne({name});
        if(dbName){
            next(new Error("Username is already in use!"));
        }else{
            let dbPhone = await userDB.findOne({phone});
            if(dbPhone){
                next(new Error("Phone number is already in use!"))
            }else{
                await new userDB({name,phone,password}).save();
                Msg(res,"Register Success!",req.body);
            }
        }
        
    }catch(error){
       console.log(error);
    }
}

//level2
const register2 = async(req,res,next)=>{
    let name = req.body.name.toLowerCase();
    let phone = req.body.phone;
    let password = req.body.password;

    try{
        let dbName = await userDB.findOne({name});
        if(dbName){
            next(new Error("Username is already in use!"));
            return;
        }
        let dbPhone = await userDB.findOne({phone});
        if(dbPhone){
            next(new Error("Phone number is already in use!"));
            return;
        }
        await new userDB({name,phone,password}).save();
        Msg(res,"Register Success!",req.body);
        
    
    }catch(error){
       console.log(error);
    }
}

//Level3 Password encode
const register = async(req,res,next)=>{
    let name = req.body.name.toLowerCase();
    let phone = req.body.phone;
    let password = req.body.password;

    try{
        let dbName = await userDB.findOne({name});
        if(dbName){
            next(new Error("Username is already in use!"));
            return;
        }
        let dbPhone = await userDB.findOne({phone});
        if(dbPhone){
            next(new Error("Phone number is already in use!"));
            return;
        }

        let encodedPass = Encoder.encode(password);
        await new userDB({name,phone,password : encodedPass}).save();
        Msg(res,"Register Success!");
        
    
    }catch(error){
       console.log(error);
    }
}

const login = async(req,res,next)=>{
    let name = req.body.name.toLowerCase();
    let password = req.body.password;

    let dbUser = await userDB.findOne({name});

    if(!dbUser){
        next(new Error("Creditial Error"));
        return;
    }
    
    if(!Encoder.compare(password,dbUser.password)){
        next(new Error("Creditial Error"));
        return;
    }

    let successUser = dbUser.toObject();
    delete successUser.password;

    await setCacheUser(dbUser._id.toString(),successUser);

    let token = Token.make({id:dbUser._id.toString()});
    Msg(res,"Login Success",{token});
}

const getMe = async (req,res,next)=> {
    //let user = await userDB.findById(req.userId).select("-password -__v");
    Msg(res,"User Detail",req.user);
}

module.exports = {
    register,
    login,
    getMe
}