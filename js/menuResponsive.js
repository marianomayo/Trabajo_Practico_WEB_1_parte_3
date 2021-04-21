"use strict";
document.addEventListener("DOMContentLoaded",
    
function(){
    "use strict"
    //llamo con el boton btn_menu
    document.querySelector(".btn_menu").addEventListener("click", toggleMenu);
    //le doy la funcion show al menu para que salga para abajo.
    function toggleMenu() {
        document.querySelector(".navigation").classList.toggle("show");
    }

}


);