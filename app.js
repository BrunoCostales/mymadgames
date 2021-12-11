require('dotenv').config()
const express = require("express");
const methodOverride = require('method-override');
const createError = require('http-errors');
const app = express() //Requerimos modulo de express para levantar nuestro servidor
const path = require ('path');
const morgan = require ('morgan');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const indexRouter = require('./src/routes/indexRouter')
const productRouter = require('./src/routes/productsRouter')
const pcRouter = require('./src/routes/productCartRouter')
const userRouter = require('./src/routes/userRouter')
const purchaseRouter = require('./src/routes/purchaseRouter')
const mercadoPagoRouter = require('./src/routes/mercadoPagoRouter')
const persistSessionMiddleware = require('./src/middleware/persistSessionMiddleware')
const logged = require('./src/middleware/loggedMiddleware')
const myPurchaseRouter = require ('./src/routes/myPurchaseRouter')
const apiRouter = require('./src/api/apiRouter')
const buyNowRouter = require ('./src/routes/buyNowRouter')
const favRouter = require('./src/routes/favRouter')


app.set ("view engine", "ejs") ; //Establecimos como template engine ejs
app.set('views', path.join(__dirname, '/src/views'));

app.use(cookieParser())
app.use(session({ secret: "Shh, secreto", resave: false, saveUninitialized: false }));
app.use(methodOverride('_method'));// Requerimos el overRide para manipular los metodos PUT-DELETE
app.use(express.urlencoded({ extended: false })); //Sirve como parseo de peticiones HTTP y facilita la forma en la que accedemos a una peticion de la misma
app.use (express.json()); //para capturar informacion
app.use(express.static('public'))//Establecemos como carpeta estatica
app.use (morgan('dev')) ;

 // middleware para persistir session a traves de toda la app
//app.use(persistSessionMiddleware)
app.use(logged)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

 /*  app.use(cors) */


app.listen(3002,()=>{
    console.log("Listening on port 3002")
})





app.use('/',indexRouter)
app.use('/products',productRouter)
app.use('/product-cart',pcRouter)
app.use('/user',userRouter)
app.use('/purchase-detail',purchaseRouter)
app.use('/mp',mercadoPagoRouter)
app.use ('/myPurchases',myPurchaseRouter)
app.use ('/api',apiRouter)
app.use ('/buy-now', buyNowRouter)
app.use('/favorites',favRouter)

app.use((req, res, next) => next(createError(404)));