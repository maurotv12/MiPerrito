

module.exports = function(app) {

    const ctrlPaseos = require('../controlador/cpaseos')

    app.route('/paseo/getAllPaseos')
        .get( ctrlPaseos.getAllPaseos ) ;

    app.route('/paseo/getPaseosXnombre')
        .post( ctrlPaseos.getPaseosXnombre ) ;

    app.route( '/paseo/addPaseos' )
        .post( ctrlPaseos.addPaseos ) ;

    app.route( '/paseo/delPaseos' )
        .post( ctrlPaseos.delPaseos ) ;

    app.route( '/paseo/updPaseos' )
        .post( ctrlPaseos.updPaseos ) ;
}

