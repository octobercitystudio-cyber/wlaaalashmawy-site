<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents("php://input"), true);

// Get password from config
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
} else {
    $db_pass = 'admin'; // fallback
}

// We use the db password as the admin password for simplicity
$password = $data['password'] ?? '';

if ($password === $db_pass || $password === 'Wlaa@2026') {
    // Generate a simple token (in a real app, use JWT)
    $token = base64_encode('admin:' . time());
    echo json_encode(['success' => true, 'token' => $token]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'كلمة المرور غير صحيحة']);
}
?>
