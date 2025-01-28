
const mongoose = require('mongoose');
const express  = require('express');
const morgan   = require('morgan');
const path     = require('path');
const bp       = require('body-parser') ;
const cors     = require('cors');

const hostname = 'localhost';
const port = 3000;

/* Configración de conexion MONGODB*/
var bdURL = "mongodb://127.0.0.1:27017/bdmiperrito";
mongoose.connect(bdURL);
//************* */

//Configuración de eventos a base de datos
mongoose.connection.on('openconected', function () {console.log("conexion a mongodb realizada:" + bdURL)})
mongoose.connection.on('error', function (err) {console.log("No hay conexion a mongodb:" + err)})
mongoose.connection.on('disconected', function (msg) {console.log("Desconectado de mongodb:" + msg)})

process.on('SIGNIN', function (){
    mongoose.connection.close(function (){
        console.log("conexion a mongo terminada por finalizacion del servidor");
        process.exit(0);
    });
} )
//************* */
const app = express();

app.use(morgan('dev'));
app.use(bp.json());
app.use(cors());

require ('./rutas/rmascota')(app);
require ('./rutas/rpaseadores')(app);
require ('./rutas/rduenos')(app);
require ('./rutas/rpaseos')(app);

app.use( express.static(path.join(__dirname + '/public') ) );

app.use ((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><head><title>Express</title></head><body><h1>HOLA MUNDO EXPRESS</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log (`Servidor en ejecución en http://${hostname}:${port}/`);
    
})