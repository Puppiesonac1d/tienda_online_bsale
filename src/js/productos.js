function buscarProductos() {
    $.ajax({
        type: "GET",
        url: "src/api/prodAPI.php",
        data: {
            busqueda: document.getElementById("buscarTXT").value,
        },
        success: function (response) {
            while (document.getElementById("contenedorListaProductos").firstChild) {
                document.getElementById("contenedorListaProductos").removeChild(document.getElementById("contenedorListaProductos").firstChild);
            }

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