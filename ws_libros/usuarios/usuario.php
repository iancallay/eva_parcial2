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
        $sql = "SELECT * FROM usuarios";
        $query = mysqli_query($conn, $sql);

        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = [
                    'codigo' => $row['usu_id'],
                    'nombre' => $row['usu_nombre'],
                    'apellido' => $row['usu_apellido'],
                    'cedula' => $row['usu_cedula'],
                    'correo' => $row['usu_email'],
                    'clave' => $row['usu_clave']
                ];
            }
            $respuesta = ['code' => 200, 'response' => 'Data fetched successfully', 'estado' => true, 'data' => $data];
        } else {
            $respuesta = ['code' => 400, 'response' => 'No data found', 'estado' => false];
        }
        break;

    case 'insertar':
        $hashedPassword = password_hash($post['clave'], PASSWORD_DEFAULT);
        $sql = sprintf(
            "INSERT INTO usuarios (usu_nombre, usu_apellido, usu_cedula, usu_email, usu_clave)
                VALUES ('%s', '%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($conn, $post['nombre']),
            mysqli_real_escape_string($conn, $post['apellido']),
            mysqli_real_escape_string($conn, $post['cedula']),
            mysqli_real_escape_string($conn, $post['correo']),
            mysqli_real_escape_string($conn, $hashedPassword)
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data inserted successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to insert data', 'estado' => false];
        break;

    case 'actualizar':
        $sql = sprintf(
            "UPDATE usuarios
                SET usu_nombre='%s', usu_apellido='%s', usu_cedula='%s', usu_email='%s', usu_clave='%s'
                WHERE usu_id='%s'",
            mysqli_real_escape_string($conn, $post['nombre']),
            mysqli_real_escape_string($conn, $post['apellido']),
            mysqli_real_escape_string($conn, $post['cedula']),
            mysqli_real_escape_string($conn, $post['correo']),
            mysqli_real_escape_string($conn, $post['clave']),
            mysqli_real_escape_string($conn, $post['codigo'])
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data updated successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to update data', 'estado' => false];
        break;

    case 'eliminar':
        $sql = sprintf(
            "DELETE FROM usuarios WHERE usu_id='%s'",
            mysqli_real_escape_string($conn, $post['codigo'])
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query
            ? ['code' => 200, 'response' => 'Data deleted successfully', 'estado' => true]
            : ['code' => 400, 'response' => 'Failed to delete data', 'estado' => false];
        break;

    case 'verificar_cedula':
        $sql = sprintf(
            "SELECT * FROM usuarios WHERE usu_cedula='%s'",
            mysqli_real_escape_string($conn, $post['cedula'])
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query && mysqli_num_rows($query) > 0
            ? ['code' => 200, 'response' => 'Cedula already exist', 'estado' => true]
            : ['code' => 400, 'response' => 'No data found', 'estado' => false];
        break;

    case 'verificar_correo':
        $sql = sprintf(
            "SELECT * FROM usuarios WHERE usu_email='%s'",
            mysqli_real_escape_string($conn, $post['correo'])
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query && mysqli_num_rows($query) > 0
            ? ['code' => 200, 'response' => 'Email already exist', 'estado' => true]
            : ['code' => 400, 'response' => 'No data found', 'estado' => false];
        break;

    case 'dato':
        $sql = sprintf(
            "SELECT * FROM usuarios WHERE usu_id='%s'",
            mysqli_real_escape_string($conn, $post['codigo'])
        );
        $query = mysqli_query($conn, $sql);
        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = [
                    'codigo' => $row['usu_id'],
                    'nombre' => $row['usu_nombre'],
                    'apellido' => $row['usu_apellido'],
                    'cedula' => $row['usu_cedula'],
                    'correo' => $row['usu_email'],
                    'clave' => $row['usu_clave']
                ];
            }
            $respuesta = ['code' => 200, 'response' => 'Data fetched successfully', 'estado' => true, 'data' => $data];
        } else {
            $respuesta = ['code' => 400, 'response' => 'No data found', 'estado' => false];
        }
        break;

    default:
        $respuesta = ['code' => 400, 'response' => 'Invalid action', 'estado' => false];
        break;
}

echo json_encode($respuesta);
