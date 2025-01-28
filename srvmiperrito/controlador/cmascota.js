const mongoose = require('mongoose') ;
const Mascota = require('../modelo/mmascota') ;

exports.getAllMascotas = (req,res) => {

    try {
        Mascota.find().populate('Iddue')
        .then( (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;
    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }
} ;

exports.getMascotaXnombre = (req,res) => {

    try {

        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        Mascota.find( {_id:iid} )
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} )
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;



exports.delMascota = (req,res) => {

    try {

        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;
        
        Mascota.deleteOne( {_id:iid} )
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;

exports.updMascota = (req,res) => {

    try {
        
        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        Mascota.updateOne( {_id:iid},{ $set:{
            Nommas:req.body.nommas,
            Raza:req.body.raza,
            Genero:req.body.genero,
            Recomendaciones:req.body.recomendaciones} } )
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;

exports.addMascota = (req,res) => {

    try {
        
        var oMcta = new Mascota( {
            Nommas:req.body.nommas,
            Raza:req.body.raza,
            Genero:req.body.genero,
            Recomendaciones:req.body.recomendaciones,
            Iddue:req.body.iddue} ) ;

        oMcta.save()
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    } catch (error) {
        res.send( {rta:"ER",info:error, msg:req.body.iddue} ) ;
    }

} ;



exports.getIMasPas = (req,res) => {

    try {
        
        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        Mascota.aggregate( [
            {
                $match: { _id:iid }
            },
            {
                $lookup: {
                    from:'Paseadores',      // LA COLECCION CON LA QUE VAMOS A RELACIONARNOS
                    localField:'idPas',     // NOMBRE DE LA PROPIEDAD/CAMPO DE LA COLECCION MASCOTAS
                    foreignField:'_id',     // NOMBRE DE LA PROPIEDAD/CAMPO DE LA COLECCION PASEADORES
                    as:'infpas'             // NOMBRE DEL ARRAY DE SALIDA
                }
            },
            {
                $unwind: '$infpas'          //DESGLOSE DEL ARRAY EN DOCUMENTOS INDIVIDUALES
            }
        ] )
        .then(  (rta) => {
            res.send( {rta:"OK",info:rta} ) ;
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;

