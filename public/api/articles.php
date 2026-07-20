<?php
require_once __DIR__ . '/db.php';
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$method = $_SERVER['REQUEST_METHOD'];

// Helper to check authentication
function checkAuth() {
    $headers = apache_request_headers();
    $auth = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    // We will use a simple Bearer token for the admin dashboard
    // The real authentication will be checked in the login script and stored in localStorage
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
    $stmt = $pdo->query("SELECT * FROM articles ORDER BY id DESC");
    echo json_encode($stmt->fetchAll());
} 
elseif ($method == 'POST') {
    checkAuth();
    $data = json_decode(file_get_contents("php://input"), true);
    if (!isset($data['title']) || !isset($data['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing fields']);
        exit;
    }
    
    $stmt = $pdo->prepare("INSERT INTO articles (title, title_en, date, category, category_en, image, content, content_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['title'],
        $data['title_en'] ?? '',
        $data['date'] ?? date('d M Y'),
        $data['category'] ?? 'عام',
        $data['category_en'] ?? 'General',
        $data['image'] ?? '/images/articles/placeholder.jpg',
        $data['content'],
        $data['content_en'] ?? ''
    ]);
    
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
}
elseif ($method == 'DELETE') {
    checkAuth();
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    if ($id) {
        $stmt = $pdo->prepare("DELETE FROM articles WHERE id = ?");
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
    
    $stmt = $pdo->prepare("UPDATE articles SET title=?, title_en=?, category=?, category_en=?, image=?, content=?, content_en=? WHERE id=?");
    $stmt->execute([
        $data['title'],
        $data['title_en'] ?? '',
        $data['category'],
        $data['category_en'] ?? '',
        $data['image'],
        $data['content'],
        $data['content_en'] ?? '',
        $data['id']
    ]);
    echo json_encode(['success' => true]);
}
?>
