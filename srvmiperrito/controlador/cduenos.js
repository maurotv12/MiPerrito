
const mongoose = require('mongoose') ;
const Duenos = require('../modelo/mduenos') ;

exports.getAllDuenos = (req,res) => {

    try {
        Duenos.find()
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

exports.getDuenosXnombre = (req,res) => {

    try {
        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;

        Duenos.find( {_id:iid} )
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


exports.delDuenos = (req,res) => {
    console.log(req.body.iid)
    try {
        const iid = new mongoose.Types.ObjectId(req.body.iid) ;

        Duenos.deleteOne( {_id:iid} )
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

exports.updDuenos = (req,res) => {

    try {
        console.log(JSON.stringify(req.body));
        const iid = new mongoose.Types.ObjectId( req.body.iid ) ;
        Duenos.updateOne( {_id:iid},
            { $set:{
            Nomdue: req.body.nomdue,
            Teldue: req.body.teldue,
            Dirdue: req.body.dirdue,
            Cordue: req.body.cordue} } )
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

exports.addDuenos = (req,res) => {

    try {
        
        var oDue = new Duenos( {
            Nomdue: req.body.nomdue,
            Teldue: req.body.teldue,
            Dirdue: req.body.dirdue,
            Cordue: req.body.cordue} ) ;

        oDue.save()
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


