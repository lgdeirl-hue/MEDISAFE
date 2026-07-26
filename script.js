// =====================================
// NAVEGACIÓN
// =====================================

function irA(pagina){

    window.location.href = pagina;

}





// =====================================
// REGISTRO DE USUARIO
// =====================================

function registrarUsuario(){


    let nombre = document.getElementById("nombre")?.value;

    let correo = document.getElementById("correo")?.value;

    let password = document.getElementById("password")?.value;

    let confirmar = document.getElementById("confirmar")?.value;



    if(!nombre || !correo || !password){

        alert("Complete todos los campos");

        return;

    }



    if(password !== confirmar){

        alert("Las contraseñas no coinciden");

        return;

    }



    let usuario = {

        nombre: nombre,

        correo: correo,

        password: password

    };



    localStorage.setItem(

        "usuario",

        JSON.stringify(usuario)

    );



    alert("Cuenta creada correctamente");


    irA("login.html");


}






// =====================================
// LOGIN
// =====================================


function iniciarSesion(){


    let correo = document.getElementById("correo").value;

    let password = document.getElementById("password").value;



    let usuario = JSON.parse(

        localStorage.getItem("usuario")

    );




    if(!usuario){

        alert("No existe una cuenta registrada");

        return;

    }





    if(
        correo === usuario.correo &&
        password === usuario.password
    ){


        localStorage.setItem(
            "sesion",
            "activo"
        );


        irA("dashboard.html");


    }else{


        alert("Correo o contraseña incorrectos");


    }



}








// =====================================
// GUARDAR MEDICAMENTO
// =====================================


function guardarMedicamento(){



    let nombre = document.getElementById(
        "nombreMedicamento"
    ).value;



    let dosis = document.getElementById(
        "dosisMedicamento"
    ).value;



    let hora = document.getElementById(
        "horaMedicamento"
    ).value;





    if(!nombre || !dosis || !hora){


        alert(
            "Complete todos los datos del medicamento"
        );


        return;


    }






    let medicamentos = JSON.parse(

        localStorage.getItem("medicamentos")

    ) || [];







    medicamentos.push({


        nombre:nombre,

        dosis:dosis,

        hora:hora


    });







    localStorage.setItem(

        "medicamentos",

        JSON.stringify(medicamentos)

    );






    alert(
        "Medicamento agregado correctamente"
    );



    irA("medicamentos.html");



}








// =====================================
// MOSTRAR MEDICAMENTOS
// =====================================


function mostrarMedicamentos(){



    let lista = document.getElementById(
        "listaMedicamentos"
    );



    if(!lista){

        return;

    }





    let medicamentos = JSON.parse(

        localStorage.getItem("medicamentos")

    ) || [];





    lista.innerHTML = "";






    if(medicamentos.length === 0){


        lista.innerHTML = `

        <p>
        No tienes medicamentos registrados.
        </p>

        `;


        return;


    }






    medicamentos.forEach(function(medicamento){



        lista.innerHTML += `


        <div class="card-medicamento">


            <h3>
            💊 ${medicamento.nombre}
            </h3>


            <p>
            Dosis:
            ${medicamento.dosis}
            </p>


            <p>
            ⏰ Hora:
            ${medicamento.hora}
            </p>



        </div>


        `;



    });





}








// =====================================
// DASHBOARD
// =====================================


function cargarDashboard(){



    let nombre = document.getElementById(
        "nombreUsuario"
    );



    let usuario = JSON.parse(

        localStorage.getItem("usuario")

    );





    if(nombre && usuario){


        nombre.textContent =
        usuario.nombre;


    }




    let panel = document.getElementById(
        "dashboardMedicamentos"
    );



    if(!panel){

        return;

    }





    let medicamentos = JSON.parse(

        localStorage.getItem("medicamentos")

    ) || [];





    panel.innerHTML="";





    if(medicamentos.length===0){


        panel.innerHTML =
        "<p>No tienes medicamentos próximos.</p>";

        return;


    }





    medicamentos.forEach(function(medicamento){



        panel.innerHTML += `


        <div class="card-medicamento">


        <h3>
        💊 ${medicamento.nombre}
        </h3>


        <p>
        ${medicamento.hora}
        </p>


        </div>


        `;


    });




}







// =====================================
// RECORDATORIOS
// =====================================


function cargarRecordatorios(){



    let lista = document.getElementById(
        "listaRecordatorios"
    );



    if(!lista){

        return;

    }






    let medicamentos = JSON.parse(

        localStorage.getItem("medicamentos")

    ) || [];






    lista.innerHTML="";





    if(medicamentos.length===0){


        lista.innerHTML = `

        <p>
        No tienes recordatorios registrados.
        </p>

        `;


        return;


    }







    medicamentos.forEach(function(medicamento){



        lista.innerHTML += `


        <div class="card-medicamento">


            <h3>
            ⏰ ${medicamento.nombre}
            </h3>


            <p>
            Dosis:
            ${medicamento.dosis}
            </p>


            <p>
            Hora:
            ${medicamento.hora}
            </p>


            <p>
            Estado:
            🟡 Pendiente
            </p>


        </div>


        `;


    });



}








// =====================================
// BUSCADOR
// =====================================


function buscarMedicamento(){



    let texto = document.getElementById(
        "buscar"
    ).value.toLowerCase();



    let tarjetas = document.querySelectorAll(
        ".card-medicamento"
    );



    tarjetas.forEach(function(card){


        if(
            card.textContent
            .toLowerCase()
            .includes(texto)
        ){


            card.style.display="block";


        }else{


            card.style.display="none";


        }



    });



}







// =====================================
// INFORMACIÓN
// =====================================


function mostrarAlerta(titulo,mensaje){


    alert(
        titulo +
        "\n\n" +
        mensaje
    );


}







// =====================================
// CARGA AUTOMÁTICA
// =====================================


document.addEventListener(
"DOMContentLoaded",
function(){


    mostrarMedicamentos();


    cargarDashboard();


    cargarRecordatorios();



});