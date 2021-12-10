<?php
//Parámetros de conexión a Base de datos...
$hostURL = 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com';
$dbUsuario = 'bsale_test';
$dbPass = 'bsale_test';
$dbEsquema = 'bsale_test';

$conn = mysqli_connect($hostURL, $dbUsuario, $dbPass, $dbEsquema);

mysqli_set_charset($conn, "utf8");

if ($conn->connect_error) {
    die('Conexión fallida con el host: ' . $conn->connect_error);
} else {
    $query = "select p.name,c.name from product p join category c on p.category = c.id order by c.name;";
    $resultado = mysqli_query($conn, $query);
    while ($row = $resultado->fetch_array()) {
        echo $row[0] . ' - ' . $row[1] . '</br>';
    }
}
