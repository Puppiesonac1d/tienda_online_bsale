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
//Cargar productos

$nomProd = $_GET['nomProd'];

$query = "select p.id as idProd,p.name as prod,p.url_image,p.price,p.discount, c.name as cat from product p join category c on p.category = c.id 
where  LOWER(p.name) like LOWER('%$nomProd%');";
$result = mysqli_query($conn, $query);
$arr = array();

while ($row = mysqli_fetch_array($result)) {
    $arr[] = $row;
}

echo json_encode($arr);
