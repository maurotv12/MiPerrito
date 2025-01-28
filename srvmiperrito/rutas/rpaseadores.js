

module.exports = function(app) {

    const ctrlPaseadores = require('../controlador/cpaseadores')

    app.route('/pas/getAllPaseadores')
        .get( ctrlPaseadores.getAllPaseadores ) ;

    app.route('/pas/getPaseadoresXnombre')
        .post( ctrlPaseadores.getPaseadoresXnombre ) ;

    app.route( '/pas/addPaseadores' )
        .post( ctrlPaseadores.addPaseadores ) ;

    app.route( '/pas/delPaseadores' )
        .post( ctrlPaseadores.delPaseadores ) ;

    app.route( '/pas/updPaseadores' )
        .post( ctrlPaseadores.updPaseadores ) ;
}


