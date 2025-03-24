const path = require('path');
const fs = require('fs')

const genFileName = (filename) =>  {
   let modiName = new Date().valueOf() + "_" + filename;
   modiName = modiName.replace(/\s/g,"");
   return modiName;
}

const getSavePath = (filename) =>  path.join(__dirname,'../public/images') + "/" + filename; 

const getImageLink = (filename) => process.env.IMG_PATH + "/" + filename;

const saveSingleFile = async(req,res,next) => {
    let files = req.files;
    let filename = files.file.name;
    filename =  genFileName(filename);
    let filePath = getSavePath(filename);
    req.files.file.mv(filePath);
    let imgLink =  getImageLink(filename);
    req.body.image = imgLink;
    next();
}

const saveMultipleFiles = async(req,res,next)=>{
    let files = req.files.files;
    let imageLinks = [];
    for(let i = 0; i < files.length; i++){
        let file = files[i];
        let filename = file.name;
        filename = genFileName(filename);
        let filePath =getSavePath(filename);
        file.mv(filePath);
        imageLinks.push(getImageLink(filename));
    }
    req.body.images = imageLinks;
    next();
}

const deleteImageByName = async (name) => {
    let filePath = getSavePath(name);
    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
    }
}
const deleteImageByLink = async(Link) => {
    let pathAry = Link.split('/');
    let name = link.split('/')[pathAry.length-1];
    await deleteImageByName(name);
}

module.exports = {
    saveSingleFile,
    saveMultipleFiles,
    deleteImageByName,
    deleteImageByLink
}