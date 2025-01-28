document.addEventListener("DOMContentLoaded", () => {
    getMascotas(false);
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const sections = {
        Mascotas: document.getElementById("mascotas"),
        Dueños: document.getElementById("duenos"),
        Paseadores: document.getElementById("paseadores"),
        Paseos: document.getElementById("paseos"),
    };

    // Escuchar clic en cada enlace
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar comportamiento predeterminado
        const selectedSection = link.textContent.trim(); // Obtener el texto del enlace

        // Quitar la clase 'active' de todos los enlaces
        navLinks.forEach((nav) => nav.classList.remove("active"));

        // Ocultar todas las secciones
        Object.values(sections).forEach((section) => {
            section.style.display = "none";
        });

        // Mostrar la sección correspondiente
        if (sections[selectedSection]) {
            sections[selectedSection].style.display = "block";
        }

        // Marcar el enlace como activo
        link.classList.add("active");
        });
    });
});

function getMascotas(showTable) {

    fetch( "http://localhost:3000/mcta/getAllMascotas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;
        
        if ( showTable ) {
            verTabla( rta ) ;
        }

        const selectElement = document.getElementById("masid");

        selectElement.innerHTML = '<option value="" disabled selected>Seleccione</option>';

        rta.info.forEach((mascota) => {
            const option = document.createElement("option");
            option.value = mascota._id; // ID de la mascota
            option.textContent = mascota.Nommas; // Nombre de la mascota
            selectElement.appendChild(option);
        });

     } )
    .catch( (err) => { document.getElementById("rtaMiMascota").innerHTML }) ;
}

function consultarMascotas() {

    getMascotas(true) ;

    console.log( "FIN" ) ;
    
}

function getMascota() {

    var data = {
        iid: document.getElementById("iid").value
    } ;

    fetch( "http://localhost:3000/mcta/getMascotaXnombre", {
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
                document.getElementById("nombre").value          = mm.info[0].Nommas ;
                document.getElementById("raza").value            = mm.info[0].Raza ;
                document.getElementById("genero").value          = mm.info[0].Genero ;
                document.getElementById("recomendaciones").value = mm.info[0].Recomendaciones ;
            } else {
                alert( "Mascota no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("rtaMiMascota").innerHTML = "ERROR:" + err ;
    }) ;

}


function delMascota() {

    var data = {
        iid: document.getElementById("iid").value
    } ;

    var opc = confirm( "Esta seguro de eliminar a la mascota: " + document.getElementById("nombre").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/mcta/delMascota", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            if( mm.rta == "ER" ) {
                document.getElementById("rtaMiMascota").innerHTML = mm.info ;
            } else {
                document.getElementById("rtaMiMascota").innerHTML = "Mascota eliminada del sistema: " + mm.info ;
                consultarMascotas() ;
                alert( "Mascota eliminada" ) ;
            }

        } )
        .catch( (err) => {
            document.getElementById("rtaMiMascota").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function verTabla( rta ) {

    var mitab = document.getElementById("lstmasc").querySelector("tbody") ;

    mitab.innerHTML = "" ;

        for( let i=0 ; i < rta.info.length ; i=i+1 ) {

            tr = document.createElement("tr") ;

            tdNom = document.createElement("td") ;
            tdNom.innerHTML = rta.info[i].Nommas ;
            tr.appendChild( tdNom ) ;

            tdRaz = document.createElement("td") ;
            tdRaz.innerHTML = rta.info[i].Raza ;
            tr.appendChild( tdRaz ) ;

            tdGen = document.createElement("td") ;
            tdGen.innerHTML = rta.info[i].Genero ;
            tr.appendChild( tdGen ) ;

            tdRec = document.createElement("td") ;
            tdRec.innerHTML = rta.info[i].Recomendaciones ;
            tr.appendChild( tdRec ) ;

            tdAcc = document.createElement("td") ;
            icono = document.createElement("i") ;

            icono.className = "bi bi-binoculars" ;
            icono.onclick = function() {
                document.getElementById("iid").value             = rta.info[i]._id ;
                document.getElementById("nombre").value          = rta.info[i].Nommas ;
                document.getElementById("raza").value            = rta.info[i].Raza ;
                document.getElementById("genero").value          = rta.info[i].Genero ;
                document.getElementById("recomendaciones").value = rta.info[i].Recomendaciones ;
                document.getElementById("iddue").value           = rta.info[i].Iddue._id ;
            } ;

            tdAcc.appendChild( icono ) ;
            tr.appendChild( tdAcc ) ;

            mitab.appendChild( tr ) ;
        }
}

function updMascota() {

    var data = {
        iid:             document.getElementById("iid").value,
        nommas:          document.getElementById("nombre").value,
        raza:            document.getElementById("raza").value,
        genero:          document.getElementById("genero").value,
        recomendaciones: document.getElementById("recomendaciones").value
    } ;

    var opc = confirm( "Esta seguro de modificar la info de la mascota: " + document.getElementById("nombre").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/mcta/updMascota", {
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
                msg = "ERROR: No fue posible actualizar la info de la mascota: " + mm.info ;
            } else {
                if( mm.info.modifiedCount > 0 ){
                    msg = "Mascota actualizada con exito: " ;
                    consultarMascotas() ;
                } else {
                    msg = "La mascota x actualizar no existe" ;
                }
            }

            document.getElementById("rtaMiMascota").innerHTML = msg
            alert( msg ) ;

        } )
        .catch( (err) => {
            document.getElementById("rtaMiMascota").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function addMascota() {

    var data = {
        nommas:          document.getElementById("nombre").value,
        raza:            document.getElementById("raza").value,
        genero:          document.getElementById("genero").value,
        recomendaciones: document.getElementById("recomendaciones").value,
        iddue:           document.getElementById("iddue").value

    } ;

    fetch( "http://localhost:3000/mcta/addMascota", {
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
            msg = "ERROR: No fue posible crear la nueva mascota: " + mm.info ;
        } else {
            getMascotas(true) ;
            document.getElementById("iid").value             = '';
            document.getElementById("nombre").value          = '';
            document.getElementById("raza").value            = '';
            document.getElementById("genero").value          = '';
            document.getElementById("recomendaciones").value = '';
            document.getElementById("iddue").value           = '';
            msg = "Mascota creada con exito: " ;
        }

        document.getElementById("rtaMiMascota").innerHTML = msg
        alert( msg ) ;

    } )
    .catch( (err) => {
        document.getElementById("rtaMiMascota").innerHTML = "ERROR:" + err ;
    }) ;
    
}

function verIid() {

    alert( document.getElementById("iid").value ) ;

}

function verIMasPas() {

    var data = {
        iid: document.getElementById("iid").value
    } ;

    fetch( "http://localhost:3000/mcta/getIMasPas", {
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