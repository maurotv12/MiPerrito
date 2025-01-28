var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

var sqma = new mongoose.Schema(
    {
        id:              {type:Intl,Required:"El id es requerido"},
        Nommas:          {type:String,Required:"Nombre mascota requerido"},
        Raza:            {type:String,Required:"Raza es requerida"},
        Genero:          {type:String,Required:"1:Macho...2:Hembra"},
        Recomendaciones: {type:String,Required:"Recomendaciones para el paseador"},
        Iddue:           {type:schema.ObjectId, ref:"Dueno",Required:"Iddue"}
    }
) ;

module.exports = mongoose.model( 'Mascota',sqma ) ;