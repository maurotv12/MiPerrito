
const mongoose = require('mongoose') ;
const Paseos = require('../modelo/mpaseos') ;

exports.getAllPaseos = (req,res) => {

    try {
        Paseos.find().populate('Masid').populate('Pasid')
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

exports.getPaseosXnombre = (req,res) => {

    try {
        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        Paseos.find( {_id:iid} )
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


exports.delPaseos = (req,res) => {
    console.log(req.body.iid)
    try {
        const iid = new mongoose.Types.ObjectId(req.body.iid) ;

        Paseos.deleteOne( {_id:iid} )
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

exports.updPaseos = (req,res) => {

    try {
        console.log(JSON.stringify(req.body));
        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;
        Paseos.updateOne( {_id:iid},
            { $set:{
            Fecpas: req.body.fecpas,
            Horpas: req.body.horpas,
            Tiepas: req.body.tiepas,
            Masid: req.body.masid,
            Pasid: req.body.pasid,
            Novpas: req.body.novpas} } )
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

exports.addPaseos = (req,res) => {

    try {
        var oPaseo = new Paseos( {
            Fecpas: req.body.fecpas,
            Horpas: req.body.horpas,
            Tiepas: req.body.tiepas,
            Masid: req.body.masid,
            Pasid: req.body.pasid,
            Novpas: req.body.novpas} ) ;

        oPaseo.save()
        .then(  (rta) => {
            console.log("Controlador"+ rta ) ;
            res.send( {rta:"OK",info:rta} ) ;
        } )
        .catch( (err) => {
            res.send( {rta:"ER",info:err} ) ;
        } ) ;

    } catch (error) {
        res.send( {rta:"ER",info:error} ) ;
    }

} ;


