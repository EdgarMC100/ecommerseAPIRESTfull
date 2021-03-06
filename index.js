'use strict'
const express = require("express");

const mongoose = require("mongoose");
const Product = require('./models/product');
const productRoutes = require('./routes/products_routes');
const userRoutes = require('./routes/users_routes');
const bodyParser = require("body-parser");
const config = require("./config");
const authUserMiddleware = require("./middlewares/auth_user");
const hbs = require("express-handlebars");


let app = express();
app.use(bodyParser.urlencoded({extended:false}));//var urlencoded = bodyParser.urlencoded({extended:false}); 
app.use(bodyParser.json());// var jsonParser = bodyParser.json(); 
app.engine('.hbs',hbs({
    defaultLayout: 'default',
    extname: 'hbs'
}));
app.set('view engine','hbs');
app.use(productRoutes);
app.use(userRoutes);
app.get('/api/private',authUserMiddleware,function (req,res) {
    res.status(200).send({message:"You have access"});
})




mongoose.connect(config.db,{useNewUrlParser: true,useUnifiedTopology:true},(err,res)=>{
    if(err)
        return console.log(`Error al conectar a la base de datos\nError:\t${err}  `)
    console.log("conexion a la base de datos establecida")
    app.listen(config.port,()=>{console.log(`API REST running at http://localhost:${config.port}`)});
})


// mongoose.connect('mongodb://localhost/webstore', {useNewUrlParser: true,useUnifiedTopology:true});
// const db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error'));
// db.once('open',function () {
//     console.log("conexion a la base de datos establecida")
//     app.listen(port,()=>{console.log(`API REST running at http://localhost:${port}`)});
// });
