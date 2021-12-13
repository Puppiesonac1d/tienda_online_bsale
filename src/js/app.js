// Constructor de un item
function Item(id, nombre, url, precio, descuento, qty) {
    this.id = id;
    this.nombre = nombre;
    this.url = url;
    this.precio = precio;
    this.descuento = descuento;
    this.qty = qty;
}
//Arreglo que contiene los items
var carro = [];

//Listar categorias de api
function listarCategorias() {
    console.log('cargando lista de categorias...');
    var url = 'src/api/categoriaApi.php';
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) {
            try {
                var jsonresp = JSON.parse(body);
                if (jsonresp.length > 0) {

                    //Opcion por defecto
                    var opcionDef = document.createElement("option");
                    opcionDef.text = 'Seleccione categoría';
                    opcionDef.value = 0;
                    opcionDef.selected = true;
                    document.getElementById('categoria').append(opcionDef);
                    for (var i = 0; i < jsonresp.length; i++) {
                        var opcion = document.createElement("option");
                        opcion.text = jsonresp[i].cat;
                        opcion.value = jsonresp[i].cat;
                        document.getElementById('categoria').append(opcion);
                    }
                } else {
                    console.log('no hay resultados');
                }
            } catch (err) {
                console.log('Ocurrió un error en ' + err);
            }
        });
}

//Listar productos desde API
function listarProductos(busqueda, cat) {
    console.log('Busqueda: ' + busqueda + ' - ' + 'categoria : ' + cat)
    var url = 'src/api/listaprodapi.php?nomProd=' + busqueda + '&cat=' + cat;
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) {
            try {
                var jsonresp = JSON.parse(body);
                if (jsonresp.length > 0) {
                    //una vez obtenida la respuesta, se limpiará el contenedor de los productos para renderizar los deseados.
                    document.getElementById("listaProductos").innerHTML = '';
                    for (var i = 0; i < jsonresp.length; i++) {
                        var card = document.createElement('div');
                        card.className = 'card';
                        card.style.display = 'flex';
                        card.style.flexDirection = 'column';
                        card.style.justifyContent = 'space-evenly';
                        card.style.padding = '10px';
                        card.style.width = '200px';
                        card.style.width = '200px';

                        var prodImg = document.createElement('img');
                        prodImg.src = jsonresp[i].url_image;
                        prodImg.className = 'card-img-top';
                        prodImg.alt = '?';

                        card.append(prodImg);
                        //Si el descuento es mayor a 0, se adjuntará el div que indica el porcentaje de descuento
                        if (jsonresp[i].discount > 0) {
                            var disContainer = document.createElement("div");
                            disContainer.style.borderRadius = '100px';
                            disContainer.style.backgroundColor = 'red';
                            disContainer.style.color = 'white';
                            disContainer.style.textAlign = 'center';
                            disContainer.innerHTML = jsonresp[i].discount + "%";
                            card.appendChild(disContainer);
                        } else {
                            var disContainer = document.createElement("div");
                            card.appendChild(disContainer);
                        }

                        var prodNombre = document.createElement('h5');
                        prodNombre.className = 'card-title';
                        prodNombre.innerHTML = jsonresp[i].prod;

                        card.append(prodNombre);


                        if (jsonresp[i].discount > 0) {
                            var calcDcto = parseInt(jsonresp[i].price) - (parseInt(jsonresp[i].discount) * parseInt(jsonresp[i].price)) / 100;

                            var precioDcto = document.createElement("p");
                            precioDcto.className = 'card-text mb-2';
                            precioDcto.innerHTML = "Precio oferta: $" + calcDcto;

                            var precioNormal = document.createElement("p");
                            precioNormal.className = 'card-text mb-2 text-muted';
                            precioNormal.innerHTML =
                                "Precio normal: $<s>" + parseInt(jsonresp[i].price) + "</s>";

                            card.appendChild(precioDcto);
                            card.appendChild(precioNormal);
                        } else {
                            var precioNormal = document.createElement("span");
                            precioNormal.style.color = "b3b3b3";
                            precioNormal.innerHTML = "Precio normal: $" + parseInt(jsonresp[i].price);
                            card.appendChild(precioNormal);
                            var precioDcto = document.createElement("p");
                            precioDcto.className = 'card-text mb-2';
                            precioDcto.innerHTML = '';
                            card.appendChild(precioDcto);
                        }

                        var agregaCarroBtn = document.createElement("button");
                        agregaCarroBtn.id = "b" + jsonresp[i].idProd;
                        agregaCarroBtn.className = "btn btn-primary";
                        agregaCarroBtn.innerHTML = "Agregar al carro";

                        agregaCarroBtn.onclick = function () {
                            console.log("id del boton: " + this.id.replace("b", ""));
                            agregaCarro(this.id.replace("b", ""));
                        };
                        card.appendChild(agregaCarroBtn);
                        document.getElementById('listaProductos').append(card);
                    }
                } else {
                    console.log('no hay resultados');
                }
            } catch (err) {
                console.log('ocurrió un error en: ' + err);
            }
        });
}
//Ejecuta una busqueda utilizando el campo de texto y botón
function buscarTexto($this) {
    //Obtener el texto de busqueda y la categoría
    var val = document.getElementById('busquedaTXT').value;
    var cat = document.getElementById('categoria').value;
    listarProductos(val, cat);
}
//Ejecuta una busqueda utilizando el campo de texto y botón
function buscarCategoria() {
    //Obtener el texto de busqueda y la categoría
    var val = '';
    var cat = document.getElementById('categoria').value;
    listarProductos(val, cat);
}
//Función que permite agregar un artículo nuevo al carro de compras
function agregaCarro(prodId) {
    //Conectar con el servidor para obtener la información del artículo
    var url = 'src/api/busquedaAPI.php?prodId=' + prodId;
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) {
            try {
                var id = "";
                var nombre = "";
                var url = "";
                var precio = "";
                var descuento = "";
                var respJSON = JSON.parse(body);
                for (var i = 0; i < respJSON.length; i++) {
                    id = respJSON[i].idProd;
                    nombre = respJSON[i].prod;
                    url = respJSON[i].url_image;
                    precio = respJSON[i].price;
                    descuento = respJSON[i].discount;
                }
                //Validar si el producto existe
                var existe = false;
                for (var i in carro) {
                    if (carro[i].id === id) {
                        existe = true;
                        carro[i].qty = carro[i].qty + 1;
                        window.alert("Ya existe el producto");
                        break;
                    }
                }
                if (existe == false) {
                    var item = new Item(id, nombre, url, precio, descuento, 1);
                    carro.push(item);
                    sessionStorage.setItem('carro', JSON.stringify(carro));
                }
                console.log(carro);
            } catch (err) {
                console.log('error: ' + err);
            }
        });
}

//Ejecutar al iniciar la aplicación
listarCategorias()
listarProductos('', '');

module.exports = { carro };