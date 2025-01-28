

var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

var sqma = new mongoose.Schema(
    {
        Nompas:          {type:String,Required:"El nombre y apellido es requerido"},
        Tipide :         {type:String,Required:"Tipo de identificacion requerido"},
        Numide :         {type:String,Required:"Numero de identificacion requerido"},
        Numcelpas:       {type:String,Required:"Numero de celular requerido"},
        Email:           {type:String,Required:"Email es requerido"},
        Numcelemp:       {type:String,Required:"Numero de celular empresa requerido"},
        Diremp:          {type:String,Required:"Direccion empresarequerido"},
        Dirpas:          {type:String,Required:"Direccion paseador requerido"},
        Imgpas:          {type:String,Required:"Imagen paseador requerido"},
        Tarifa:          {type:String,Required:"Tarifa requerida"},
        Calpas:          {type:String,Required:"Calificacion requerido"},
    
    }
) ;

module.exports = mongoose.model( 'Paseadore',sqma ) ;