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
    // Get IP address
    $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
    // If multiple IPs are present, take the first one
    if (strpos($ip_address, ',') !== false) {
        $ip_address = explode(',', $ip_address)[0];
    }

    if (!empty($path)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO visits (page_path, visitor_id, ip_address) VALUES (?, ?, ?)");
            $stmt->execute([$path, $visitor, $ip_address]);
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
