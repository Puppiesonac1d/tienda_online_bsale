
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
var carro = new Array();


//Almacenar en sesión el array de carro con sus últimos cambios
function guardarCarroSesion() {
    sessionStorage.setItem('carro', JSON.stringify(carro));
}

//Cargar el array de carro que se encuentra almacenado en la sesión.
function cargarCarro() {
    carro = JSON.parse(sessionStorage.getItem('carro'));
}

function agregaCarro(id) {
    $.ajax({
        type: "GET",
        url: "src/api/prodAPI.php",
        data: {
            prodId: id
        },
        success: function (response) {
            var respJSON = JSON.parse(response);

            var id = '';
            var nombre = '';
            var url = '';
            var precio = '';
            var descuento = '';
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
        }
    });
}

function listarArticulos() {
    console.log(JSON.stringify(carro, null, 3));
    var output = "";
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
    listarArticulos();
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
    listarArticulos();
}

/*Actualizar el total de los productos */
function calcularTotal() {
    var total = 0;
    if (carro.lenght > 0) {
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
    listarArticulos();
}

function limpiarTodo() {
    carro = [];
    calcularTotal();
    guardarCarroSesion();
    cargarCarro();
    listarArticulos();
}
