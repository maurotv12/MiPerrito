
function getPaseos() {

    fetch( "http://localhost:3000/paseo/getAllPaseos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;
        verTablaPaseo( rta ) ;
     } )
    .catch( (err) => { document.getElementById("rtaMiPaseo").innerHTML }) ;
}

function consultarPaseos() {

    getPaseos() ;

    console.log( "FIN" ) ;
    
}

function getPaseosXNombre() {

    var data = {
        iid: document.getElementById("iid").value
    } ;

    fetch( "http://localhost:3000/paseo/getPaseosXnombre", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 

        console.log( "------->" + JSON.stringify(mm) ) ;
        


        if( mm.rta == "ER" ) {
            document.getElementById("rtaMiPaseo").innerHTML = "ERROR:" + mm.info ;
        } else {
            if( mm.info.length > 0 ) {
                document.getElementById("nomdue").value         = mm.info[0].Fecpas ;
                document.getElementById("horpas").value         = mm.info[0].Horpas ;
                document.getElementById("masid").value          = mm.info[0].Masid ;
                document.getElementById("pasid").value          = mm.info[0].Pasid ;
                document.getElementById("novpas").value         = mm.info[0].Novpas ;

                
            } else {
                alert( "Paseo no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("rtaMiPaseo").innerHTML = "ERROR:" + err ;
    }) ;

}

function delPaseos() {

    var data = {
        iid: document.getElementById("iid").value
    } ;
    
    var opc = confirm( "Esta seguro de eliminar el paseo de la mascota: " + document.getElementById("masid").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/paseo/delPaseos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            if( mm.rta == "ER" ) {
                document.getElementById("rtaMiPaseo").innerHTML = mm.info ;
            } else {
                document.getElementById("rtaMiPaseo").innerHTML = "Paseo eliminado del sistema: " + mm.info ;
                consultarPaseos() ;
                alert( "Paseo eliminado" ) ;
            }
        } )
        .catch( (err) => {
            document.getElementById("rtaMiPaseo").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function verTablaPaseo( rta ) {
    
    var mitab = document.getElementById("lstpaseo").querySelector("tbody") ;
    
    mitab.innerHTML = "" ;    
        for( let i=0 ; i < rta.info.length; i=i+1 ) {
            
            tr = document.createElement("tr") ;

            tdFec = document.createElement("td") ;
            tdFec.innerHTML = rta.info[i].Fecpas ;
            tr.appendChild( tdFec ) ;
            
            tdHor = document.createElement("td") ;
            tdHor.innerHTML = rta.info[i].Horpas ;
            tr.appendChild( tdHor ) ;
             
            tdTie = document.createElement("td") ;            
            tdTie.innerHTML = rta.info[i].Tiepas ;
            tr.appendChild( tdTie ) ;

            tdMas = document.createElement("td") ;            
            tdMas.innerHTML = rta.info[i].Masid.Nommas ;
            tr.appendChild( tdMas ) ;

            tdPas = document.createElement("td") ;            
            tdPas.innerHTML = rta.info[i].Pasid.Nompas ;
            tr.appendChild( tdPas ) ;

            tdNov = document.createElement("td") ;            
            tdNov.innerHTML = rta.info[i].Novpas ;
            tr.appendChild( tdNov ) ;
            
            tdAcc = document.createElement("td") ;
            icono = document.createElement("i") ;

            
            icono.className = "bi bi-binoculars" ;
            icono.onclick = function() {
                document.getElementById("iid").value            = rta.info[i]._id ;
                document.getElementById("fecpas").value         = rta.info[i].Fecpas ;
                document.getElementById("horpas").value         = rta.info[i].Horpas ;
                document.getElementById("tiepas").value         = rta.info[i].Tiepas ;
                document.getElementById("masid").value         = rta.info[i].Masid._id ;
                document.getElementById("pasid").value         = rta.info[i].Pasid._id ;
                document.getElementById("novpas").value         = rta.info[i].Novpas ;
            } ;
            tdAcc.appendChild( icono ) ;
            tr.appendChild( tdAcc )
            mitab.appendChild( tr ) ;
        }
}

function updPaseos() {

    var data = {
        iid:             document.getElementById("iid").value,
        fecpas:          document.getElementById("fecpas").value,
        horpas:          document.getElementById("horpas").value,
        tiepas:          document.getElementById("tiepas").value,
        masid:           document.getElementById("masid").value,
        pasid:           document.getElementById("pasid").value,
        novpas:          document.getElementById("novpas").value,

    } ;

    var opc = confirm( "Esta seguro de modificar la info del Paseo de la mascota: " + document.getElementById("masid").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/paseo/updPaseos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            var msg = "" ;

            if( mm.rta == "ER" ) {
                msg = "ERROR: No fue posible actualizar la info del Paseo: " + mm.info ;
            } else {
                if( mm.info.modifiedCount > 0 ){
                    msg = "Dueño actualizado con exito: " ;
                    consultarPaseos() ;
                } else {
                    msg = "El Dueño a actualizar no existe" ;
                }
            }

            document.getElementById("rtaMiPaseo").innerHTML = msg
            alert( msg ) ;

        } )
        .catch( (err) => {
            document.getElementById("rtaMiPaseo").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function addPaseos() {

    var data = {
        fecpas: document.getElementById("fecpas").value,
        horpas: document.getElementById("horpas").value,
        tiepas: document.getElementById("tiepas").value,
        masid: document.getElementById("masid").value,
        pasid: document.getElementById("pasid").value,
        novpas: document.getElementById("novpas").value
    };

    console.log(data);

    fetch("http://localhost:3000/paseo/addPaseos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 

        console.log(mm);
        
        var msg = "" ;

        if( mm.rta == "ER" ) {
            msg = "ERROR: No fue posible crear el nuevo Paseo: " + mm.info ;
        } else {
            getPaseos();
            msg = "Paseo creado con exito: " ;
        }

        document.getElementById("rtaMiPaseo").innerHTML = msg
        alert( msg ) ;

    } )
    .catch( (err) => {
        document.getElementById("rtaMiPaseo").innerHTML = "ERROR:" + err ;
    }) ;
    
}

function verIid() {

    alert( document.getElementById("iid").value ) ;

}


function verIMasPas() {

    var data = {
        iid: document.getElementById("iid").value
    } ;

    fetch( "http://localhost:3000/paseo/getIMasPas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 

        console.log( "------->" + JSON.stringify(mm) ) ;

        if( mm.rta == "ER" ) {
            document.getElementById("rtaMiMascota").innerHTML = "ERROR:" + mm.info ;
        } else {
            if( mm.info.length > 0 ) {
                for( let i=0 ; i < mm.info.length ; i++ ) {
                    console.log( "mascota:" + mm.info[i].Nommas + "---Paseador:" + mm.info[i].infpas.nompas + ":)" ) ;
                }
            } else {
                alert( "Mascota no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("rtaMiMascota").innerHTML = "ERROR:" + err ;
    }) ;

}