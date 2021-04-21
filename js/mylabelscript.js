
"use strict";
document.addEventListener("DOMContentLoaded",

    function () {
        document.getElementById("movercaptcha").addEventListener("click", HacerRamdom);
        function HacerRamdom() {
            //variable de captcha
            let valorCaptcha = Math.floor(Math.random() * 100000);
            //el random aparezca dentro de un input
            document.getElementById("ramdom").innerText = valorCaptcha;
        }

        //esto es lo que escribe el usuario que va adentro del input
        let ingresoUsuario = document.getElementById("inputUser");
        //el parrafo que va a mostrar si el valor ingresado es verdadero o incorrecto
        let parrafo = document.querySelector("#elValorEs");

        //funcion que debe realizar es
        function verificarCaptcha() {            
            if (ingresoUsuario.value === document.getElementById("ramdom").innerText) {
                parrafo.innerHTML = ("CAPTCHA VERIFICADO");                
            }
            else {
                parrafo.innerHTML = ("CAPTCHA INCORRECTO");                
            }
            setTimeout(modificarParrafo, 3000);
        }

        function modificarParrafo(){
            parrafo.innerHTML="";
            ingresoUsuario.value="";
            document.getElementById("ramdom").innerText="";
        }
        //boton para verificar
        let verificador = document.querySelector("#btn-verificar");
        //esto es un evento que hace que cuando haga click en el boton verificar me realice la funcion.
        verificador.addEventListener("click", verificarCaptcha);


        console.log(valorCaptcha);
        console.log(ingresoUsuario);

    }


);