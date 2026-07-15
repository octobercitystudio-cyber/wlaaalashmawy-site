<?php
require_once __DIR__ . '/db.php';
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $path = $data['path'] ?? '/';
    $visitor = $data['visitor'] ?? 'unknown';

    if (!empty($path)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO visits (page_path, visitor_id) VALUES (?, ?)");
            $stmt->execute([$path, $visitor]);
            echo json_encode(['success' => true]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Database error']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing path']);
    }
}
?>
