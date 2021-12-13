
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

//Almacenar en sesión el array de carro con sus últimos cambios
function guardarCarroSesion() {
    //sessionStorage.setItem('carro', JSON.stringify(carro));
}
//Cargar el array de carro que se encuentra almacenado en la sesión.
function cargarCarro() {
    //carro = JSON.parse(sessionStorage.getItem('carro'));
}


function limpiarTodo() {
    carro = [];
    guardarCarroSesion();
    cargarCarro();
}
