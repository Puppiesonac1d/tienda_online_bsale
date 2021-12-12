<?php
include 'conn.php';
header('Content-Type: JSON');


//Si se recibe un GET con parámetros de búsqueda...
//Cargar productos
$query = "select p.id as idProd,p.name as prod,p.url_image,p.price,p.discount, c.name as cat from product p join category c on p.category = c.id;";
$result = mysqli_query($conn, $query);
$arr = array();

while ($row = mysqli_fetch_array($result)) {
    $arr[] = $row;
}

echo json_encode($arr);
