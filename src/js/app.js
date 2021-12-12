
// Constructor de un item
function Item(id, nombre, url, precio, descuento, qty) {
    this.id = id;
    this.nombre = nombre;
    this.url = url;
    this.precio = precio;
    this.descuento = descuento;
    this.qty = qty;
}

//Crear arreglo de items en el carro
var carro = [];

//Inicializar items
window.onload = function () {
    //limpiarTodo();
    buscarProductos();
    cargarCarro();
    calcularTotal();
    listarArticulosCarro();
};

function buscarProductos() {
    $.ajax({
        type: "GET",
        url: "src/api/prodAPI.php",
        data: {
        },
        success: function (response) {

            var respJSON = JSON.parse(response);

            for (var i = 0; i < respJSON.length; i++) {
                var cardProducto = document.createElement("div");
                cardProducto.className = "card-producto";

                /* ID DEL PRODUCTO */

                //Contenedor de id del producto
                var idProductoCont = document.createElement("div");
                idProductoCont.className = "prod-id";

                //Numero de identificacion
                var idProducto = document.createElement("span");
                idProducto.className = "spanMute";
                idProducto.innerHTML = respJSON[i].idProd;

                idProductoCont.appendChild(idProducto);

                /* FIN DE ID DE PRODUCTO */

                //contenedor de Imagen del producto
                var imgCont = document.createElement("div");
                imgCont.className = "cardImgContainer";

                var img = document.createElement("img");
                img.className = "img-130";
                img.alt = "?";
                img.src = respJSON[i].url_image;

                imgCont.appendChild(img);

                //Contenedor de información de producto
                var infProdCont = document.createElement("div");
                infProdCont.className = "inf-prod-cont";

                //Si el descuento es mayor a 0, se adjuntará el div que indica el porcentaje de descuento
                if (respJSON[i].discount > 0) {
                    var disContainer = document.createElement("div");
                    disContainer.className = "dcto-prod";
                    disContainer.innerHTML = respJSON[i].discount + "%";
                    infProdCont.appendChild(disContainer);
                }

                var hr = document.createElement("hr");
                hr.style.color = "#a6a6a6";
                hr.style.opacity = 0.3;

                infProdCont.appendChild(hr);

                //Contenedor interno

                var infCont2 = document.createElement("div");
                infCont2.style.display = "flex";
                infCont2.style.flexDirection = "column";

                //contenedor de Nombre del producto
                var tituloCont = document.createElement("div");
                tituloCont.style.textAlign = "center";
                tituloCont.style.color = "#404040";
                tituloCont.style.height = "50%";
                tituloCont.style.whiteSpace = "nowrap";
                tituloCont.style.overflow = "hidden";
                tituloCont.style.textOverflow = "ellipsis";

                //Nombre de producto

                var titulo = document.createElement("b");
                titulo.innerHTML = respJSON[i].prod;

                tituloCont.appendChild(titulo);

                //Contenedor de totales
                var totalesCont = document.createElement("div");
                totalesCont.style.textAlign = "center";
                totalesCont.style.height = "40%";
                totalesCont.style.display = "flex";
                totalesCont.style.flexDirection = "column";

                if (respJSON[i].discount > 0) {
                    var calcDcto =
                        parseInt(respJSON[i].price) -
                        (parseInt(respJSON[i].discount) * parseInt(respJSON[i].price)) /
                        100;

                    var precioDcto = document.createElement("span");
                    precioDcto.innerHTML = "Precio oferta: $" + calcDcto;

                    var precioNormal = document.createElement("span");
                    precioNormal.style.color = "b3b3b3";
                    precioNormal.innerHTML =
                        "Precio normal: $<s>" + parseInt(respJSON[i].price) + "</s>";

                    totalesCont.appendChild(precioDcto);
                    totalesCont.appendChild(precioNormal);
                } else {
                    var precioNormal = document.createElement("span");
                    precioNormal.style.color = "b3b3b3";
                    precioNormal.innerHTML =
                        "Precio normal: $" + parseInt(respJSON[i].price);
                    totalesCont.appendChild(precioNormal);
                }

                //boton de agregar al carrito
                var agregaCarroCont = document.createElement("div");
                agregaCarroCont.style.display = "flex";
                agregaCarroCont.style.flexDirection = "row";
                agregaCarroCont.style.justifyContent = "space-evenly";

                var agregaCarroBtn = document.createElement("button");
                agregaCarroBtn.id = "b" + respJSON[i].idProd;
                agregaCarroBtn.className = "btn-add-carro";
                agregaCarroBtn.innerHTML = "Agregar al carro";

                agregaCarroBtn.onclick = function () {
                    console.log("id del boton: " + this.id.replace("b", ""));
                    agregaCarro(this.id.replace("b", ""));
                };

                agregaCarroCont.appendChild(agregaCarroBtn);

                infCont2.appendChild(tituloCont);
                infCont2.appendChild(totalesCont);
                infCont2.appendChild(agregaCarroCont);

                infProdCont.appendChild(infCont2);

                //Juntar los elementos creados
                cardProducto.appendChild(idProductoCont);
                cardProducto.appendChild(imgCont);
                cardProducto.appendChild(infProdCont);

                document
                    .getElementById("contenedorListaProductos")
                    .appendChild(cardProducto);
            }
        },
    });
}

//Almacenar en sesión el array de carro con sus últimos cambios
function guardarCarroSesion() {
    sessionStorage.setItem('carro', JSON.stringify(carro));
}

//Cargar el array de carro que se encuentra almacenado en la sesión.
function cargarCarro() {
    carro = JSON.parse(sessionStorage.getItem('carro'));
}

function agregaCarro(prodId) {

    var id = '';
    var nombre = '';
    var url = '';
    var precio = '';
    var descuento = '';

    $.ajax({
        type: "GET",
        url: "src/api/busquedaAPI.php",
        data: {
            prodId: prodId
        },
        success: function (response) {
            console.log('respuesta: ' + response);

            var respJSON = JSON.parse(response);
            for (var i = 0; i < respJSON.length; i++) {
                id = respJSON[i].idProd;
                nombre = respJSON[i].prod;
                url = respJSON[i].url_image;
                precio = respJSON[i].price;
                descuento = respJSON[i].discount;
            }

            //Validar la existencia del producto, por lo que si eiste se incrementará en 1 su QTY, en caso contrario, se guardará uno nuevo
            var existe = false;
            for (var i in carro) {
                if (carro[i].id === id) {
                    existe = true;
                    carro[i].qty = carro[i].qty + 1;
                    window.alert('Ya existe el producto');
                    break;
                }
            }

            if (existe == false) {
                var item = new Item(id, nombre, url, precio, descuento, 1);
                carro.push(item);
            }
            guardarCarroSesion()
            cargarCarro();
            window.alert('Producto agregado al carrito!');
        }
    });
}

function listarArticulosCarro() {
    var output = '';
    for (var i in carro) {
        if (carro[i].descuento != 0) {
            output += "<div class='carroItem'>" +
                "<div class='carroItem-int'>" +
                "<span class='spanMute'>id: " + carro[i].id + "</span>" +
                "</div>" +
                "<div class='carroItem-int'>" +
                "<img class='img-80' src='" + carro[i].url + "' alt='?' />" +
                "</div>" +
                "<div class='carroItem-int '>" +
                "<span class='text-align: left;font-size: small;'>" + carro[i].nombre + "</span>" +
                "</div>" +
                "<hr>" +
                "<div class='carroItem-int ' style='flex-direction:column'>" +
                "<span>Precio con descuento: $" + (parseInt(carro[i].precio) - (parseInt(carro[i].descuento) * (parseInt(carro[i].precio)) / 100)) + "</span>" +
                "<span>Precio normal : $<s>" + carro[i].precio + "</s></span>" +
                "</div>" +
                "<hr>" +
                "<div class='carroItem-int '>" +
                "<input type='button' value='-' style='border-radius:10px;background-color:#ddd;border: solid 0.5px;width:30px;height:30px;' " +
                "onclick='restarQty(" + carro[i].id + ");'/>" +
                "<input id='qty" + carro[i].id + "' " +
                "type='numeric' value='" + carro[i].qty + "' style='width:40px;height:30px;background-color: white;border: solid 0.5px;border-radius:10px'/>" +
                "<input type='button' style='border-radius:10px;background-color:#ddd;border: solid 0.5px;width:30px;height:30px;' value='+' " +
                "onclick='aumentarQty(" + carro[i].id + ");'/>" +
                "</div>" +
                "<div class='carroItem-int'>" +
                "<input type='button' id='" + carro[i].id + "' value ='X' " +
                "style='background-color:red;width:20px;height:20px;border-radius:20px;color:white;border: solid 0.5px' " +
                "onclick='borrarArticulo(" + carro[i].id + ")' />" +
                "</div>" +
                "</div>";
        } else {
            output += "<div class='carroItem'>" +
                "<div class='carroItem-int'>" +
                "<span class='spanMute'>id: " + carro[i].id + "</span>" +
                "</div>" +
                "<div class='carroItem-int'>" +
                "<img class='img-80' src='" + carro[i].url + "' alt='?' />" +
                "</div>" +
                "<div class='carroItem-int '>" +
                "<span>" + carro[i].nombre + "</span>" +
                "</div>" +
                "<hr>" +
                "<div class='carroItem-int ' style='flex-direction:column'>" +
                "<span>Precio normal : $" + carro[i].precio + "</span>" +
                "</div>" +
                "<hr>" +
                "<div class='carroItem-int '>" +
                "<input type='button' value='-' style='border-radius:10px;background-color:#ddd;border: solid 0.5px;width:30px;height:30px;' " +
                "onclick='restarQty(" + carro[i].id + ");'/>" +
                "<input id='qty" + carro[i].id + "' " +
                "type='numeric' value='" + carro[i].qty + "' style='width:40px;height:30px;background-color: white;border: solid 0.5px;border-radius:10px'/>" +
                "<input type='button' style='border-radius:10px;background-color:#ddd;border: solid 0.5px;width:30px;height:30px;' value='+' " +
                "onclick='aumentarQty(" + carro[i].id + ");'/>" +
                "</div>" +
                "<div class='carroItem-int'>" +
                "<input type='button' id='" + carro[i].id + "' value ='X' " +
                "style='background-color:red;width:20px;height:20px;border-radius:20px;color:white;border: solid 0.5px' " +
                "onclick='borrarArticulo(" + carro[i].id + ")' />" +
                "</div>" +
                "</div>";
        }
    }
    $('#carroList').html(output);
    calcularTotal();
}

/* Incrementar o restar la cantidad de unidades de un producto */
function aumentarQty(id) {
    for (var i in carro) {
        if (carro[i].id == id) {
            var actQty = carro[i].qty + 1;
            carro[i].qty = actQty;
            guardarCarroSesion();
            break;
        }
    }
    calcularTotal();
    listarArticulosCarro();
}

function restarQty(id) {
    for (var i in carro) {
        if (carro[i].id == id) {
            var actQty = carro[i].qty - 1;
            if (actQty >= 1) {
                carro[i].qty = actQty;
                guardarCarroSesion();
            } else {
                carro.splice(i, 1);
                guardarCarroSesion();
            }
            break;
        }
    }
    calcularTotal();
    listarArticulosCarro();
}

/*Actualizar el total de los productos */
function calcularTotal() {
    var total = 0;
    if (carro.length > 0) {
        for (var i in carro) {
            var totProd = 0;
            if (carro[i].descuento != 0) {
                totProd = (parseInt(carro[i].precio) - ((parseInt(carro[i].descuento) * (parseInt(carro[i].precio)) / 100))) * parseInt(carro[i].qty);
            } else {
                totProd = parseInt(carro[i].precio) * parseInt(carro[i].qty);
            }
            total = totProd + total;
        }
    }
    document.getElementById('totalPagar').innerHTML = total;
}

/* Eliminar elementos */

function borrarArticulo(id) {
    for (var i in carro) {
        if (carro[i].id == id) {
            carro.splice(i, 1);
            guardarCarroSesion();
            break;
        }
    }
    cargarCarro();
    listarArticulosCarro();
}

function limpiarTodo() {
    carro = [];
    calcularTotal();
    guardarCarroSesion();
    cargarCarro();
    listarArticulosCarro();
}
