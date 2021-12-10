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
}
