<?php

include('./config/config.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Origin, Accept');
header('Content-Type: application/json; charset=utf-8');

$post = json_decode(file_get_contents('php://input'), true);

if (!isset($post['accion'])) {
    echo json_encode(['code' => 400, 'response' => 'No action provided', 'estado' => false]);
    exit;
}

$respuesta = [];
$data = [];

switch ($post['accion']) {
    case 'consultar':
        $sql = "SELECT * FROM libros";
        $query = mysqli_query($conn, $sql);

        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = [
                    'codigo' => $row['lib_id'],
                    'usuario' => $row['lib_usuId'],
                    'nombre' => $row['lib_nombre'],
                    'titulo' => $row['lib_titulo'],
                    'autor' => $row['lib_autor'],
                    'anio' => $row['lib_anio'],
                    'editorial' => $row['lib_editorial'],
                    'fecha' => $row['lib_fecha']
                ];
            }
            $respuesta = ['code' => 200, 'response' => 'Data fetched successfully', 'estado' => true, 'data' => $data];
        } else {
            $respuesta = ['code' => 400, 'response' => 'No data found', 'estado' => false];
        }
        break;

    case 'insertar':
        $sql = sprintf(
            "INSERT INTO libros (lib_usuId, lib_nombre, lib_titulo, lib_autor, lib_anio, lib_editorial, lib_fecha)
                VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($conn, $post['usuario']),
            mysqli_real_escape_string($conn, $post['nombre']),
            mysqli_real_escape_string($conn, $post['titulo']),
            mysqli_real_escape_string($conn, $post['autor']),
            mysqli_real_escape_string($conn, $post['anio']),
            mysqli_real_escape_string($conn, $post['editorial']),
            mysqli_real_escape_string($conn, $post['fecha'])
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data inserted successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to insert data', 'estado' => false];
        break;

    case 'actualizar':
        $sql = sprintf(
            "UPDATE libros SET lib_usuId='%s', lib_nombre='%s', lib_titulo='%s', lib_autor='%s', lib_anio='%s', lib_editorial='%s', lib_fecha='%s' WHERE lib_id='%s'",
            mysqli_real_escape_string($conn, $post['usuario']),
            mysqli_real_escape_string($conn, $post['nombre']),
            mysqli_real_escape_string($conn, $post['titulo']),
            mysqli_real_escape_string($conn, $post['autor']),
            mysqli_real_escape_string($conn, $post['anio']),
            mysqli_real_escape_string($conn, $post['editorial']),
            mysqli_real_escape_string($conn, $post['fecha']),
            mysqli_real_escape_string($conn, $post['codigo'])
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data updated successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to update data', 'estado' => false];
        break;
    case 'eliminar':
        $sql = sprintf(
            "DELETE FROM libros WHERE lib_id='%s'",
            mysqli_real_escape_string($conn, $post['codigo'])
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data deleted successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to delete data', 'estado' => false];
        break;
    default:
        $respuesta = ['code' => 400, 'response' => 'Invalid action', 'estado' => false];
        break;
}
echo json_encode($respuesta);
