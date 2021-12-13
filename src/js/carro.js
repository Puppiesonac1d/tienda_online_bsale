//Cargar el carrito almacenado en sesión
var carro = JSON.parse(sessionStorage.getItem('carro'));


function cargarCarro() {
    if (carro.length == 0) {
        console.log('array vacio');
    }
    document.getElementById('productosContainer').innerHTML = '';
    for (var i in carro) {
        var card = document.createElement('div');
        card.className = 'card';
        card.style.display = 'flex';
        card.style.flexDirection = 'row';
        card.style.justifyContent = 'space-evenly';
        card.style.textAlign = 'center';
        card.style.padding = '10px';
        card.style.height = '200px';
        card.style.width = 'auto';

        var prodImg = document.createElement('img');
        prodImg.src = carro[i].url;
        prodImg.className = 'card-img-top';
        prodImg.style.width = '200px';
        prodImg.style.height = 'auto';
        prodImg.alt = '?';
        card.append(prodImg);

        var divNombre = document.createElement('div');
        divNombre.style.display = 'flex';
        divNombre.style.flexDirection = 'column';
        divNombre.style.justifyContent = 'center';

        var prodNombre = document.createElement('h5');
        prodNombre.className = 'card-title';
        prodNombre.innerHTML = carro[i].nombre;
        divNombre.append(prodNombre);

        card.append(divNombre);

        var totales = document.createElement('div');
        totales.style.display = 'flex';
        totales.style.flexDirection = 'column';
        totales.style.justifyContent = 'center';

        //Condicionante si hay descuento o no
        if (carro[i].descuento > 0) {
            var totalDcto = (parseInt(carro[i].precio) -
                (parseInt(carro[i].descuento) * parseInt(carro[i].precio)) /
                100);
            var spanDcto = document.createElement('span');
            spanDcto.innerHTML = "Precio oferta: $" + totalDcto;
            var spanPrecioNormal = document.createElement('span');
            spanPrecioNormal.innerHTML = "Precio normal: $" + carro[i].precio;
            totales.append(spanDcto);
            totales.append(spanPrecioNormal);
        } else {
            var spanPrecioNormal = document.createElement('span');
            spanPrecioNormal.innerHTML = "Precio normal: $" + carro[i].precio;
            totales.append(spanPrecioNormal);
        }

        card.append(totales);

        var divCantidad = document.createElement('div');
        divCantidad.style.width = 'auto';
        divCantidad.style.display = 'flex';
        divCantidad.style.flexDirection = 'row';
        divCantidad.style.padding = '10%';
        divCantidad.style.textAlign = 'center';


        var cantidad = '';
        cantidad += "<button class='align - middle' style='border-radius:100px;background-color:#ddd;width:30px;height:30px;' onclick='restarQty(" + carro[i].id + ")'>" +
            "-" +
            "</button>" +
            "<input type='numeric' class='align-middle' style='width:20%' value='" + carro[i].qty + "'>" + "<button class='align - middle' style='border-radius:100px;background-color:#ddd;width:30px;height:30px;' onclick='aumentarQty(" + carro[i].id + ")'>" +
            "+" +
            "</button>";

        divCantidad.innerHTML += cantidad;

        card.append(divCantidad);

        document.getElementById('productosContainer').append(card);
    }
    calcularTotal();
}


/* Incrementar o restar la cantidad de unidades de un producto */
function aumentarQty(id) {
    for (var i in carro) {
        if (carro[i].id == id) {
            var actQty = carro[i].qty + 1;
            carro[i].qty = actQty;
            sessionStorage.setItem('carro', JSON.stringify(carro));
            break;
        }
    }
    cargarCarro();
    calcularTotal();
}

function restarQty(id) {
    for (var i in carro) {
        if (carro[i].id == id) {
            var actQty = carro[i].qty - 1;
            if (actQty >= 1) {
                carro[i].qty = actQty;
            } else {
                document.getElementById("totalPagar").innerHTML = 0;
                carro.splice(i, 1);
            }
            sessionStorage.setItem('carro', JSON.stringify(carro));
            break;
        }
    }
    cargarCarro();
    calcularTotal();
}

/*Actualizar el total de los productos */
function calcularTotal() {
    if (carro.length > 0) {
        var total = 0;
        for (var i in carro) {
            var totProd = 0;
            if (carro[i].descuento != 0) {
                totProd =
                    (parseInt(carro[i].precio) -
                        (parseInt(carro[i].descuento) * parseInt(carro[i].precio)) /
                        100) *
                    parseInt(carro[i].qty);
            } else {
                totProd = parseInt(carro[i].precio) * parseInt(carro[i].qty);
            }
            total = totProd + total;
        }
        document.getElementById("totalPagar").innerHTML = total;
    }
}

/* Eliminar elementos */

function borrarArticulo(id) {
    for (var i in carro) {
        if (carro[i].id == id) {
            carro.splice(i, 1);
            sessionStorage.setItem('carro', JSON.stringify(carro));
            break;
        }
    }
    cargarCarro();
}
