require('dotenv').config();
const express = require('express');
const {LEGAL_TCP_COCKET_OPTIONS } = require('mongodb');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const app = express();
mongoose.connect(process.env.DB_URL);


app.use(express.static('public'));
app.use(express.json());
app.use(fileUpload());

const userRoute = require('./routes/user');
const catRoute = require('./routes/category');
const productRoute = require('./routes/product');

app.use('/users',userRoute);
app.use('/cats',catRoute);
app.use('/products',productRoute);

app.use((err,req,res,next)=>{
    res.status(400).json({con:false,msg:err.message});
    console.log(err);
})

const {saveSingleFile,saveMultipleFiles} = require('./utils/gallery')

app.post('/image',saveSingleFile,(req,res,next)=>{
    res.json({con:true,msg:req.imageLink});
})    

app.post('/images',saveMultipleFiles,(req,res,next)=>{
    res.json({con:true,msg:req.imageLink});
})

app.listen(process.env.PORT,()=>{
    console.clear();
    console.log(`Project is running at port ${process.env.PORT}`);
})

