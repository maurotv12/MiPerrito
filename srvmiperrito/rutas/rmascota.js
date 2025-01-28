

module.exports = function(app) {

    const ctrlMascota = require('../controlador/cmascota')

    app.route('/mcta/getAllMascotas')
        .get( ctrlMascota.getAllMascotas ) ;

    app.route('/mcta/getMascotaXnombre')
        .post( ctrlMascota.getMascotaXnombre ) ;

    app.route( '/mcta/addMascota' )
        .post( ctrlMascota.addMascota ) ;

    app.route( '/mcta/delMascota' )
        .post( ctrlMascota.delMascota ) ;

    app.route( '/mcta/updMascota' )
        .post( ctrlMascota.updMascota ) ;

    app.route( '/mcta/getIMasPas' )
        .post( ctrlMascota.getIMasPas ) ;
}


//http://localhost:3000/mcta/addMascota?nombre=laconsentida&raza=cucaracha&genero=hembra&recomendaciones=friticas