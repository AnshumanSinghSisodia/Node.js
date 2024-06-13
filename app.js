const express =require('express');
const app= express();
const morgan=require('morgan');
const bodyParser= require('body-parser');

const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');
const userRoutes= require('./api/routes/user');

const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://gagansisodiaknp786:'+ process.env.MONGO_ATLAS_PW
    +'@cluster0.2qdabpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    
);
// Dummy Comment

mongoose.Promise = global.Promise;
//middlewares
app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use ('/products',productRoutes);
app.use ('/orders',orderRoutes);
app.use('/user', userRoutes);

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*"),   //* means access to every web page ,we can write one web page as well
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allow-Methods",'put,patch,get,post,delete');
        return res.status(200).json({});
    }
    next();
})

app.use((req,res,next)=>{
    const error =new Error('Not Found')
    error.status=404
    next(error)
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports=app;