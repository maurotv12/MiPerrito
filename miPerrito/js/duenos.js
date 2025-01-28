document.addEventListener("DOMContentLoaded", function () {
    getDuenos(false);
});

function getDuenos(showTable) {

    fetch( "http://localhost:3000/duen/getAllDuenos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;

        if (showTable) {
            verTablaDue( rta ) ;
        }

        const selectElement = document.getElementById("iddue");

        selectElement.innerHTML = '<option value="" disabled selected>Seleccione</option>';

        rta.info.forEach((dueno) => {
            const option = document.createElement("option");
            option.value = dueno._id; // ID del dueño
            option.textContent = dueno.Nomdue; // Nombre del dueño
            selectElement.appendChild(option);
        });
     } )
    .catch( (err) => { document.getElementById("rtaDuenos").innerHTML }) ;
}

function consultarDuenos() {

    getDuenos(true) ;

    console.log( "FIN" ) ;
    
}

function getDuenosXNombre() {

    var data = {
        iid: document.getElementById("iid").value
    } ;

    fetch( "http://localhost:3000/duen/getDuenosXnombre", {
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
            document.getElementById("rtaDuenos").innerHTML = "ERROR:" + mm.info ;
        } else {
            if( mm.info.length > 0 ) {
                document.getElementById("nomdue").value         = mm.info[0].Nomdue ;
                document.getElementById("teldue").value         = mm.info[0].Teldue ;
                document.getElementById("dirdue").value         = mm.info[0].Dirdue ;
                document.getElementById("cordue").value         = mm.info[0].Cordue ;
            } else {
                alert( "Dueño no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("rtaDuenos").innerHTML = "ERROR:" + err ;
    }) ;

}

function delDuenos() {

    var data = {
        iid: document.getElementById("iid").value
    } ;
    
    var opc = confirm( "Esta seguro de eliminar al Dueño: " + document.getElementById("nomdue").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/duen/delDuenos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            if( mm.rta == "ER" ) {
                document.getElementById("rtaDuenos").innerHTML = mm.info ;
            } else {
                document.getElementById("rtaDuenos").innerHTML = "Dueño eliminado del sistema: " + mm.info ;
                consultarDuenos() ;
                alert( "Dueño eliminado" ) ;
            }
        } )
        .catch( (err) => {
            document.getElementById("rtaDuenos").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function verTablaDue( rta ) {
    
    var mitab = document.getElementById("lstdue").querySelector("tbody") ;
    
    mitab.innerHTML = "" ;    
        for( let i=0 ; i < rta.info.length; i=i+1 ) {
            
            tr = document.createElement("tr") ;

            tdNom = document.createElement("td") ;
            tdNom.innerHTML = rta.info[i].Nomdue ;
            tr.appendChild( tdNom ) ;
            
            tdTel = document.createElement("td") ;
            tdTel.innerHTML = rta.info[i].Teldue ;
            tr.appendChild( tdTel ) ;
             
            tdDir = document.createElement("td") ;            
            tdDir.innerHTML = rta.info[i].Dirdue ;
            tr.appendChild( tdDir ) ;

            tdCor = document.createElement("td") ;            
            tdCor.innerHTML = rta.info[i].Cordue ;
            tr.appendChild( tdCor ) ;
            
            tdAcc = document.createElement("td") ;
            icono = document.createElement("i") ;

            
            icono.className = "bi bi-binoculars" ;
            icono.onclick = function() {
                document.getElementById("iid").value            = rta.info[i]._id ;
                document.getElementById("nomdue").value         = rta.info[i].Nomdue ;
                document.getElementById("cordue").value         = rta.info[i].Cordue ;
                document.getElementById("dirdue").value         = rta.info[i].Dirdue ;
                document.getElementById("teldue").value         = rta.info[i].Teldue ;
            } ;
            tdAcc.appendChild( icono ) ;
            tr.appendChild( tdAcc )
            mitab.appendChild( tr ) ;
        }
}

function updDuenos() {

    var data = {
        iid:             document.getElementById("iid").value,
        nomdue:          document.getElementById("nomdue").value,
        teldue:          document.getElementById("teldue").value,
        dirdue:          document.getElementById("dirdue").value,
        cordue:          document.getElementById("cordue").value
    } ;

    var opc = confirm( "Esta seguro de modificar la info del Dueño: " + document.getElementById("nomdue").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/duen/updDuenos", {
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
                msg = "ERROR: No fue posible actualizar la info del Dueño: " + mm.info ;
            } else {
                if( mm.info.modifiedCount > 0 ){
                    getDuenos(false);
                    msg = "Dueño actualizado con exito: " ;
                    consultarDuenos() ;
                } else {
                    msg = "El Dueño a actualizar no existe" ;
                }
            }

            document.getElementById("rtaDuenos").innerHTML = msg
            alert( msg ) ;

        } )
        .catch( (err) => {
            document.getElementById("rtaDuenos").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function addDuenos() {

    var data = {
        nomdue:          document.getElementById("nomdue").value,
        teldue:          document.getElementById("teldue").value,
        dirdue:          document.getElementById("dirdue").value,
        cordue:          document.getElementById("cordue").value        
    } ;

    fetch( "http://localhost:3000/duen/addDuenos", {
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
            msg = "ERROR: No fue posible crear el nuevo Dueño: " + mm.info ;
        } else {
            getDuenos(true);
            document.getElementById("iid").value    = '' ;
            document.getElementById("nomdue").value = '' ;
            document.getElementById("cordue").value = '' ;
            document.getElementById("dirdue").value = '' ;
            document.getElementById("teldue").value = '' ;
            msg = "Dueño creado con exito: " ;
        }

        document.getElementById("rtaDuenos").innerHTML = msg
        alert( msg ) ;

    } )
    .catch( (err) => {
        document.getElementById("rtaDuenos").innerHTML = "ERROR:" + err ;
    }) ;
    
}

function verIid() {

    alert( document.getElementById("iid").value ) ;

}