
document.addEventListener("DOMContentLoaded", function () {
    getPaseadores(false);
});

function getPaseadores(showTable) {

    fetch( "http://localhost:3000/pas/getAllPaseadores", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;
        if (showTable) verTablaPas( rta ) ;

        const selectElement = document.getElementById("pasid");

        selectElement.innerHTML = '<option value="" disabled selected>Seleccione</option>';

        rta.info.forEach((paseador) => {
            const option = document.createElement("option");
            option.value = paseador._id; // ID del paseador
            option.textContent = paseador.Nompas; // Nombre del paseador
            selectElement.appendChild(option);
        });
     } )
    .catch( (err) => { document.getElementById("rtaPas").innerHTML }) ;
}

function consultarPaseadores() {

    getPaseadores(true) ;

    console.log( "FIN" ) ;
    
}

function getPaseadoresXNombre() {

    var data = {
        iid: document.getElementById("iid").value
    } ;

    fetch( "http://localhost:3000/pas/getPaseadoresXnombre", {
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
            document.getElementById("rtaPas").innerHTML = "ERROR:" + mm.info ;
        } else {
            if( mm.info.length > 0 ) {
                document.getElementById("tipide").value         = mm.info[0].Tipide ;
                document.getElementById("numide").value         = mm.info[0].Numide ;
                document.getElementById("numcelpas").value      = mm.info[0].Numcelpas;
                document.getElementById("email").value          = mm.info[0].Email ;
                document.getElementById("numcelemp").value      = mm.info[0].Numcelemp ;
                document.getElementById("diremp").value         = mm.info[0].Diremp ;
                document.getElementById("dirpas").value         = mm.info[0].Dirpas ;
                document.getElementById("imgpas").value         = mm.info[0].Imgpas ;
                document.getElementById("tarifa").value         = mm.info[0].Tarifa ;
                document.getElementById("calpas").value         = mm.info[0].Calpas ;
            } else {
                alert( "Paseador no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("rtaPas").innerHTML = "ERROR:" + err ;
    }) ;

}

function delPaseadores() {

    var data = {
        iid: document.getElementById("iid").value
    } ;
    
    var opc = confirm( "Esta seguro de eliminar al Paseador: " + document.getElementById("nombre").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/pas/delPaseadores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            if( mm.rta == "ER" ) {
                document.getElementById("rtaPas").innerHTML = mm.info ;
            } else {
                document.getElementById("rtaPas").innerHTML = "Paseador eliminado del sistema: " + mm.info ;
                consultarPaseadores() ;
                alert( "Paseador eliminado" ) ;
            }
        } )
        .catch( (err) => {
            document.getElementById("rtaPas").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function verTablaPas( rta ) {
    
    var mitab = document.getElementById("lstpas").querySelector("tbody") ;
    
    mitab.innerHTML = "" ; 
    console.log(rta.info.length);   
        for( let i=0 ; i < rta.info.length; i=i+1 ) {
            
            tr = document.createElement("tr") ;

            tdNom = document.createElement("td") ;
            tdNom.innerHTML = rta.info[i].Nompas ;
            tr.appendChild( tdNom ) ;
            
            tdNuc = document.createElement("td") ;
            tdNuc.innerHTML = rta.info[i].Numcelpas ;
            tr.appendChild( tdNuc ) ;
             
            tdTar = document.createElement("td") ;            
            tdTar.innerHTML = rta.info[i].Tarifa ;
            tr.appendChild( tdTar ) ;

            tdCal = document.createElement("td") ;            
            tdCal.innerHTML = rta.info[i].Calpas ;
            tr.appendChild( tdCal ) ;
            
            tdAcc = document.createElement("td") ;
            icono = document.createElement("i") ;

            
            icono.className = "bi bi-binoculars" ;
            icono.onclick = function() {
                document.getElementById("iid").value             = rta.info[i]._id ;
                document.getElementById("nombre").value          = rta.info[i].Nompas ;
                document.getElementById("tipide").value          = rta.info[i].Tipide ;
                document.getElementById("numide").value          = rta.info[i].Numide ;
                document.getElementById("numcelpas").value       = rta.info[i].Numcelpas ;
                document.getElementById("email").value           = rta.info[i].Email ;
                document.getElementById("numcelemp").value       = rta.info[i].Numcelemp ;
                document.getElementById("diremp").value          = rta.info[i].Diremp ;
                document.getElementById("dirpas").value          = rta.info[i].Dirpas ;
                document.getElementById("imgpas").value          = rta.info[i].Imgpas ;
                document.getElementById("tarifa").value          = rta.info[i].Tarifa ;
                document.getElementById("calpas").value          = rta.info[i].Calpas ;
            } ;
            tdAcc.appendChild( icono ) ;
            tr.appendChild( tdAcc )
            mitab.appendChild( tr ) ;
        }
}

function updPaseadores() {

    var data = {
        iid:             document.getElementById("iid").value,
        nompas:          document.getElementById("nombre").value,
        tipide:          document.getElementById("tipide").value,
        numide:          document.getElementById("numide").value,
        numcelpas:       document.getElementById("numcelpas").value,
        email:           document.getElementById("email").value,
        numcelemp:       document.getElementById("numcelemp").value,
        diremp:          document.getElementById("diremp").value,
        dirpas:          document.getElementById("dirpas").value,
        imgpas:          document.getElementById("imgpas").value,
        tarifa:          document.getElementById("tarifa").value,
        calpas:          document.getElementById("calpas").value
    } ;

    var opc = confirm( "Esta seguro de modificar la info del paseador: " + document.getElementById("nombre").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/pas/updPaseadores", {
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
                msg = "ERROR: No fue posible actualizar la info del Paseador: " + mm.info ;
            } else {
                if( mm.info.modifiedCount > 0 ){
                    msg = "Paseador actualizado con exito: " ;
                    consultarPaseadores() ;
                } else {
                    msg = "El paseador a actualizar no existe" ;
                }
            }

            document.getElementById("rtaPas").innerHTML = msg
            alert( msg ) ;

        } )
        .catch( (err) => {
            document.getElementById("rtaPas").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function addPaseadores() {

    var data = {
        nompas:          document.getElementById("nombre").value,
        tipide:          document.getElementById("tipide").value,
        numide:          document.getElementById("numide").value,
        numcelpas:       document.getElementById("numcelpas").value,
        email:           document.getElementById("email").value,
        numcelemp:       document.getElementById("numcelemp").value,
        diremp:          document.getElementById("diremp").value,
        dirpas:          document.getElementById("dirpas").value,
        imgpas:          document.getElementById("imgpas").value,
        tarifa:          document.getElementById("tarifa").value,
        calpas:          document.getElementById("calpas").value

        
    } ;

    fetch( "http://localhost:3000/pas/addPaseadores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 

        console.log(mm);
        
        var msg = "" ;

        if( mm.rta == "ER" ) {
            msg = "ERROR: No fue posible crear el nuevo Paseador: " + mm.info ;
        } else {
            getPaseadores(true) ;
            document.getElementById("iid").value       = '';
            document.getElementById("nombre").value    = '';
            document.getElementById("tipide").value    = '';
            document.getElementById("numide").value    = '';
            document.getElementById("numcelpas").value = '';
            document.getElementById("email").value     = '';
            document.getElementById("numcelemp").value = '';
            document.getElementById("diremp").value    = '';
            document.getElementById("dirpas").value    = '';
            document.getElementById("imgpas").value    = '';
            document.getElementById("tarifa").value    = '';
            document.getElementById("calpas").value    = '';
            msg = "Paseador creado con exito: " ;
        }

        document.getElementById("rtaPas").innerHTML = msg
        alert( msg ) ;

    } )
    .catch( (err) => {
        document.getElementById("rtaPas").innerHTML = "ERROR:" + err ;
    }) ;
    
}

function verIid() {

    alert( document.getElementById("iid").value ) ;

}