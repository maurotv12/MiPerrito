
const mongoose = require('mongoose') ;
const Paseadores = require('../modelo/mpaseadores') ;

exports.getAllPaseadores = (req,res) => {

    try {
        Paseadores.find()
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

exports.getPaseadoresXnombre = (req,res) => {

    try {
        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        Paseadores.find( {_id:iid} )
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


exports.delPaseadores = (req,res) => {
    console.log(req.body.iid)
    try {
        const iid = new mongoose.Types.ObjectId(req.body.iid) ;

        Paseadores.deleteOne( {_id:iid} )
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

exports.updPaseadores = (req,res) => {

    try {
        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;
        Paseadores.updateOne( {_id:iid},
            { $set:{
            Nompas: req.body.nompas,
            Tipide: req.body.tipide,
            Numide: req.body.numide,
            Numcelpas: req.body.numcelpas,
            Email: req.body.email,
            Numcelemp: req.body.numcelemp,
            Diremp: req.body.diremp,
            Dirpas: req.body.dirpas,
            Imgpas: req.body.imgpas,
            Tarifa: req.body.tarifa,
            Calpas: req.body.calpas} } )
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

exports.addPaseadores = (req,res) => {

    try {
        
        var oPas = new Paseadores( {
            Nompas: req.body.nompas,
            Tipide: req.body.tipide,
            Numide: req.body.numide,
            Numcelpas: req.body.numcelpas,
            Email: req.body.email,
            Numcelemp: req.body.numcelemp,
            Diremp: req.body.diremp,
            Dirpas: req.body.dirpas,
            Imgpas: req.body.imgpas,
            Tarifa: req.body.tarifa,
            Calpas: req.body.calpas} ) ;

        oPas.save()
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


