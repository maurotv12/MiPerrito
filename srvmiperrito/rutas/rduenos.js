

module.exports = function(app) {

    const ctrlDuenos = require('../controlador/cduenos')

    app.route('/duen/getAllDuenos')
        .get( ctrlDuenos.getAllDuenos ) ;

    app.route('/duen/getDuenosXnombre')
        .post( ctrlDuenos.getDuenosXnombre ) ;

    app.route( '/duen/addDuenos' )
        .post( ctrlDuenos.addDuenos ) ;

    app.route( '/duen/delDuenos' )
        .post( ctrlDuenos.delDuenos ) ;

    app.route( '/duen/updDuenos' )
        .post( ctrlDuenos.updDuenos ) ;
}

