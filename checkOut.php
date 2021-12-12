<!DOCTYPE html>
<html>
<meta name="viewport" content="width=device-width, initial-scale=1" />

<head>
  <!--Imports-->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="src/js/app.js"></script>
  <link rel="stylesheet" href="src/stylesheet/style.css" />
</head>

<body>
  <section>
    <div class="carroWrapper">
      <!--Listado de productos-->
      <div class="contenedorListaProductos">
        <div class="carroTitulo">
          <div><a href="index.php">Volver</a></div>
          <h1>Carro | 1 Productos</h1>
          <hr />
        </div>
        <!--Items-->
        <div id="carroList" style="height: 600px; padding: 10px; overflow: auto"></div>
        <!--Fin de items-->
      </div>
      <!--Fin de listado de productos-->
      <!--Total-->
      <div class="contenedorPagos">
        <div class="carroTitulo">
          <h1>Resumen de la compra</h1>
          <hr />
        </div>
        <div class="contenedorItems">
          <div class="carroItem-int">
            <h3>Total a pagar:</h3>
            <span id="totalPagar"></span>
          </div>
          <div class="carroItem-int">
            <input type="button" value="Pagar" />
          </div>
        </div>
      </div>
      <!--Fin de total-->
    </div>
  </section>
</body>
<script>
  //Inicializar items
  window.onload = function() {
    cargarCarro();
    listarArticulos();
  };
</script>

</html>