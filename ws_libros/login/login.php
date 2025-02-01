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
    case 'login':
        $email = $post['email'];
        $hashedPassword = password_hash($post['password'], PASSWORD_BCRYPT);
        $hashedPassword = $post['password'];
        $sql = sprintf(
            "SELECT * FROM usuario WHERE usu_email='%s'",
            mysqli_real_escape_string($conn, $post['email'])
        );
        $query = mysqli_query($conn, $sql);
        if ($query->num_rows > 0) {
            $row = $query->fetch_assoc();
            if (password_verify($hashedPassword, $row['usu_clave'])) {
                $data = $row;
                $respuesta = ['code' => 200, 'response' => 'Login successful', 'estado' => true];
            } else {
                $respuesta = ['code' => 400, 'response' => 'Invalid credentials', 'estado' => false];
            }
        } else {
            $respuesta = ['code' => 400, 'response' => 'User not found', 'estado' => false];
        }
        break;

    default:
        $respuesta = ['code' => 400, 'response' => 'Invalid action', 'estado' => false];
        break;
}
echo json_encode(['respuesta' => $respuesta, 'data' => $data]);
