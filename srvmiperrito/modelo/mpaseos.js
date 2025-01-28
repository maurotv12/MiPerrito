

var mongoose = require('mongoose') ;
var schema   = mongoose.Schema ;

var sqma = new mongoose.Schema(
    {
        Fecpas:          {type:String,Required:"La fecha del paseo es requerida"},
        Horpas:          {type:String,Required:"La hora del paseo es requerida"},
        Tiepas:          {type:String,Required:"El tiempo de paseo es requerido"},
        Masid:           {type:schema.ObjectId, ref:"Mascota",Required:"La mascota es requerido"},
        Pasid:           {type:schema.ObjectId, ref:"Paseadore",Required:"El paseador es requerido"},
        Novpas:          {type:String,Required:"Novedad del paseo"},
      
    }
) ;

module.exports = mongoose.model( 'Paseo',sqma ) ;