<?php
header('Content-Type: JSON');


//Establecer la conexión a la base de datos.
//Parámetros:
$hostURL = 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com';
$dbUsuario = 'bsale_test';
$dbPass = 'bsale_test';
$dbEsquema = 'bsale_test';

//Abrir conexión
$conn = mysqli_connect($hostURL, $dbUsuario, $dbPass, $dbEsquema);

mysqli_set_charset($conn, "utf8");

if ($conn->connect_error) {
    die('Conexión fallida con el host: ' . $conn->connect_error);
}

//Si se recibe un GET con parámetros de búsqueda...
//Cargar categorias
$query = "select name as cat from category order by name;";
$result = mysqli_query($conn, $query);
$arr = array();

while ($row = mysqli_fetch_array($result)) {
    $arr[] = $row;
}

echo json_encode($arr);

mysqli_close($conn);
