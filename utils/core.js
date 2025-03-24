const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const redis = require('async-redis').createClient();
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');

const DTime = {
    now : () => moment().tz("Asia/Rangon").format("YYYY-MM-DD"),
    timeStamp : () => moment().tz("Asia/Rangon").unix()
}

const RDB = {
    set: async(key,value) => await redis.set(key,JSON.stringify(value)),
    get: async(key)=> JSON.parse(await redis.get(key)),
    del: async(key)=> await redis.flushall(key)
}

const ErrorFile = {
    write : (data) => {
        let filename = DTime.now() + "_" + DTime.timeStamp() + ".txt";
        let filePath = path.join(__dirname,"../errors/" + filename);
        fs.writeFileSync(filePath,JSON.stringify(data),'utf-8');
    },
    read :(filename) => {
        let filePath = path.join(__dirname,"../errors/"+filename+".txt");
        let data = fs.readFileSync(filePath,{encoding:"utf-8"});
        return data;
    }
}

const Msg = (res,msg="",result={}) => {
    res.status(200).json({con:true,msg,result});
}

const Encoder = {
    encode : (password)=> bcrypt.hashSync(password,10),
    compare : (plain,hash) => bcrypt.compareSync(plain,hash)
}

const Token = {
    make : (payload) => JWT.sign(payload,process.env.SECRET_KEY,{expiresIn:60*60}),
}

module.exports = {
    Msg,
    Encoder,
    Token,
    RDB,
    DTime,
    ErrorFile
}