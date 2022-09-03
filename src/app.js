const express = require('express');
const path = require("path"); 

const indexRouter = require('./routes/index');
const rutesProducts = require('./routes/products');
const app = express();

// * Template Engine  *
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

// para indicarle a express cual es nuestra carpeta estatica//
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.urlencoded({extended:false})); /**esta linea permite poner seguridad al ingreso de personas a cada vista segun su categoria */

// para ordenar las rutas de nuesto proyecto//
app.use('/', indexRouter);
app.use('/products', rutesProducts);

app.use(express.json());


///* con el method Override instalado */
//* override* sirve para poder utilizar en htlm put y delete/
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get('/', (req,res)=>{
    res.render('views');
});


/**Servidor funcionando */
app.listen(3001, ()=>{
    console.log('Servidor 3001 funcionando');
});


module.exports = app;

console.log(13)
