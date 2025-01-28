

var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

var sqma = new mongoose.Schema(
    {
        Nomdue:          {type:String,Required:"El nombre y apellido es requerido"},
        Teldue:          {type:String,Required:"El telefono es requerido"},
        Dirdue:          {type:String,Required:"La direccion es requerido"},
        Cordue:          {type:String,Required:"El Correo electrónico es requerido"},
   
    
    }
) ;

module.exports = mongoose.model( 'Dueno',sqma ) ;