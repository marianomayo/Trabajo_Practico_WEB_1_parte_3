document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
    "use strict";
    let baseURL = 'https://web-unicen.herokuapp.com/api/groups/';
    let groupID = '064-VaYMa';
    let collectionID = 'productos';
    let ERopa = document.getElementById("ERopa");
    let EPrecio = document.getElementById("EPrecio");
    let ropa = document.getElementById("ropa");
    let valor = document.getElementById("precio");
    let body = document.getElementById("tbody");
    let agregarBotonAlhtml = document.getElementById("agregarBoton");
    let guardarDatosDeApi = [];
    
    function cargarTabla() {
        fetch(baseURL + groupID + "/" + collectionID, {
            method: "GET",
            mode: 'cors',
        })
            .then(function (r) {
                if (!r.ok) {
                    console.log("error")
                }
                return r.json()
            })
            .then(function (json) {
                console.log(json);
                limpiarTabla();
                for (let elem of json.productos) {
                    let productoArreglo = {
                        "id": elem._id,
                        "thing": {
                            "ropa": elem.thing.ropa.toLowerCase(),
                            "precio": elem.thing.precio
                        }
                    };
                    guardarDatosDeApi.push(productoArreglo);
                }
                for (let data of json.productos) {
                    let boton = document.createElement("button");
                    boton.innerText = "Borrar";
                    let bEditar = document.createElement("button");
                    bEditar.innerText = "Editar";
                    let nodotr = document.createElement("tr");
                    let nodotd1 = document.createElement("td");
                    let nodotd2 = document.createElement("td");
                    let nodotd4 = document.createElement("td");
                    let nodotd3 = document.createElement("td");
                    nodotd1.innerText = data.thing.ropa;
                    nodotd2.innerText = "$" + data.thing.precio;
                    nodotd4.appendChild(bEditar);
                    nodotd3.appendChild(boton);
                    nodotr.id = data._id;
                    boton.addEventListener("click", e => eliminar(data._id));

                    bEditar.addEventListener("click", function () {
                        ERopa.classList.add("aparecerInput");
                        EPrecio.classList.add("aparecerInput");
                        ERopa.value = data.thing.ropa;
                        EPrecio.value = data.thing.precio;
                        let verificarSiHayBoton = agregarBotonAlhtml.querySelectorAll("button");
                        if (verificarSiHayBoton.length == 0) {
                            let botonEditar = document.createElement("button");
                            botonEditar.innerText = "Editar Producto";
                            botonEditar.id = data._id;
                            agregarBotonAlhtml.appendChild(botonEditar);
                            botonEditar.addEventListener("click", x => editarProducto(data._id));
                        }
                    })
                    nodotr.appendChild(nodotd1);
                    nodotr.appendChild(nodotd2);
                    nodotr.appendChild(nodotd4);
                    nodotr.appendChild(nodotd3);
                    body.appendChild(nodotr);
                }
            })
            .catch(function (e) {
                console.log(e)
            })
    }


    //funcion para eliminar, paso parametro id
    function eliminar(id) {
        fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
            "method": "DELETE",
            "mode": 'cors',

        }).then(function (r) {
            if (!r.ok) {
                console.log("error")
            }
            return r.json()
        }).then(function () {
            cargarTabla();
        }).catch(function (e) {
            console.log(e)
        })
    }


    //filtrado de tabla
    function filtrarTabla() {

        ocultarLosTr();
        let inputFiltro = document.getElementById("productoAfiltrar").value.toLowerCase();
        
        for (let elem of guardarDatosDeApi) {
            if (elem.thing.ropa.includes(inputFiltro)) {
                document.getElementById(elem.id).classList.remove("inputOculto");
            }
            if (elem.thing.precio === inputFiltro) {
                document.getElementById(elem.id).classList.remove("inputOculto");
            }
        }
    }


    //oculto los tr para usar en filtrado de tabla   
    function ocultarLosTr() {
        let ocultarTr = body.querySelectorAll("tr");
        for (let elem of ocultarTr) {
            elem.classList.add("inputOculto");
        }
    }

    function desocularLosTr() {
        let mostrarTr = body.querySelectorAll("tr");
        for (let elem of mostrarTr) {
            elem.classList.remove("inputOculto");
        }
    }

    //Editar Productos
    function editarProducto(id) {
        event.preventDefault();
        let productoNuevo = {
            "thing": {
                "ropa": ERopa.value,
                "precio": EPrecio.value
            }
        };
        fetch(baseURL + groupID + "/" + collectionID + "/" + id, {
            "method": "PUT",
            "mode": 'cors',
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(productoNuevo)
        }).then(function (r) {
            if (!r.ok) {
                console.log("error")
            }
            return r.json()
        }).then(function () {
            cargarTabla();
        }).catch(function (e) {
            console.log(e)
        })
    }

    //esta funcion nos permite que no se recargue la tabla nuevamente
    function limpiarTabla() {
        body.innerHTML = "";
    }



    //funcion para agregar elemento a la tabla 
    function agregarElementoTabla() {
        if (valor.value > 0) {
            let data = {
                "thing": {
                    "ropa": ropa.value,
                    "precio": valor.value
                }
            };
            fetch(baseURL + groupID + "/" + collectionID, {
                "method": "POST",
                "mode": 'cors',
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(data)
            }).then(function (r) {
                if (!r.ok) {
                    console.log("error")
                }
                return r.json()
            })
                .then(function (json) {
                    cargarTabla(json);
                })
                .catch(function (e) {
                    console.log(e)
                })
        }
    }


    //funcion para agregar 3 elementos a la tabla
    function agregar3Elementos() {
        for (let i = 1; i <= 3; i++) {
            agregarElementoTabla();
        }

    }



    cargarTabla();
    document.getElementById("volverAtras").addEventListener("click", desocularLosTr);
    document.getElementById("filtrar").addEventListener("click", filtrarTabla);
    document.getElementById("agregar-tabla").addEventListener("click", agregarElementoTabla);
    document.getElementById("agregar-tablaX3").addEventListener("click", agregar3Elementos);

}
