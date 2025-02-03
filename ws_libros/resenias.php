<?php

include('config.php');

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
        $sql = sprintf("SELECT * FROM resenias r INNER JOIN libros l on r.res_libId = l.lib_id WHERE res_libId =' %s'",
        mysqli_real_escape_string($conn, $post['id']));
        $query = mysqli_query($conn, $sql);

        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = [
                    'titulo' => $row['lib_titulo'],
                    'codigo' => $row['res_libId'],
                    'usuario' => $row['res_userId'],
                    'comentarios' => $row['res_comentarios'],
                    'calificacion' => $row['res_calificacion']
                ];
            }
            $respuesta = ['code' => 200, 'response' => 'Data found', 'estado' => true, 'data' => $data];
        } else {
            $respuesta = ['code' => 400, 'response' => 'No se encontraron registros', 'estado' => false];
        }
        break;

    case 'insertar':
        $sql = sprintf(
            "INSERT INTO resenias (res_libId, res_userId, res_comentarios, res_calificacion)
                VALUES ('%s', '%s', '%s', '%s')",
            mysqli_real_escape_string($conn, $post['codigo']),
            mysqli_real_escape_string($conn, $post['usuario']),
            mysqli_real_escape_string($conn, $post['comentarios']),
            mysqli_real_escape_string($conn, $post['calificacion'])
        );
        $query = mysqli_query($conn, $sql);
        $respuesta = $query
            ? ['code' => 200, 'response' => 'Reseña registrada exitosamente', 'estado' => true]
            : ['code' => 400, 'response' => 'No se pudo agregar la reseña', 'estado' => false];
        break;

    default:
        $respuesta = ['code' => 400, 'response' => 'Invalid action', 'estado' => false];
        break;
}
echo json_encode($respuesta);
