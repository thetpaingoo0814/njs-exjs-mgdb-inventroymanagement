const JWT = require('jsonwebtoken');
const {getCacheUser} = require('./caches');

const verifyToken = async (req,res,next)=>{
    let authHeader = req.headers.authorization;

    if(authHeader){
        let token = authHeader.split(" ")[1];
        JWT.verify(token,process.env.SECRET_KEY,async (err,decoded)=>{
            if(err){
                if (err.message === "jwt expired"){
                    next(new Error("Token Expired"));
                }else{
                    next(new Error("Tokenization Error"))
                }
            }else{
                req.userId = decoded.id;
                req.user = await getCacheUser(decoded.id);
                next();
            }
        })
    }else{
        next(new Error("Authorization Error"));
    }
    
}

module.exports = {
    verifyToken
}