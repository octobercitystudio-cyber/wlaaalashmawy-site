<?php
require_once __DIR__ . '/db.php';
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {
    http_response_code(200);
    exit;
}

function checkAuth() {
    $headers = apache_request_headers();
    $auth = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    if (empty($auth) && isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $auth = $_SERVER['HTTP_AUTHORIZATION'];
    }
    if (strpos($auth, 'Bearer') === false) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

if ($method == 'POST') {
    checkAuth();
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['table']) || !isset($data['id']) || !isset($data['field'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    $table = $data['table'];
    $id = intval($data['id']);
    $field = $data['field'];
    if (!array_key_exists('value', $data)) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing value']);
        exit;
    }
    $value = $data['value'];

    $allowed_tables = ['services', 'sectors', 'articles', 'features', 'stats', 'testimonials'];
    if (!in_array($table, $allowed_tables)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid table']);
        exit;
    }

    // A whitelist of safe fields to prevent SQL injection or messing with ids
    $allowed_fields = ['title', 'title_en', 'description', 'description_en', 'content', 'content_en', 'image', 'value', 'author', 'author_en', 'icon'];
    if (!in_array($field, $allowed_fields)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid field']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE `$table` SET `$field` = ? WHERE id = ?");
        $stmt->execute([$value, $id]);
        
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
