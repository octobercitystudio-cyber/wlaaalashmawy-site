<?php
require_once __DIR__ . '/db.php';
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$method = $_SERVER['REQUEST_METHOD'];

function checkAuth() {
    $headers = apache_request_headers();
    $auth = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    if (strpos($auth, 'Bearer') === false) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

if ($method == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method == 'GET') {
    $stmt = $pdo->query("SELECT * FROM stats ORDER BY id ASC");
    echo json_encode($stmt->fetchAll());
} 
elseif ($method == 'POST') {
    checkAuth();
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['title']) || !isset($data['value'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing fields']);
        exit;
    }
    
    $stmt = $pdo->prepare("INSERT INTO stats (title, value, title_en) VALUES (?, ?, ?)");
    $stmt->execute([
        $data['title'],
        $data['value']
    , $data['title_en'] ?? '']);
    
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
}
elseif ($method == 'DELETE') {
    checkAuth();
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM stats WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing ID']);
    }
}
elseif ($method == 'PUT') {
    checkAuth();
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing ID']);
        exit;
    }
    
    $stmt = $pdo->prepare("UPDATE stats SET title=?, value=?, title_en=? WHERE id=?");
    $stmt->execute([
        $data['title'],
        $data['value'], $data['title_en'] ?? '', $data['id']
    ]);
    echo json_encode(['success' => true]);
}
?>
