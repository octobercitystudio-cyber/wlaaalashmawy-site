<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

require_once __DIR__ . '/db.php';

// Fetch settings
$stmt = $pdo->query("SELECT setting_key, setting_value FROM settings WHERE setting_key IN ('admin_username', 'admin_password')");
$settings = [];
while ($row = $stmt->fetch()) {
    $settings[$row['setting_key']] = $row['setting_value'];
}

$stored_username = $settings['admin_username'] ?? 'admin';
$stored_password = $settings['admin_password'] ?? 'Wlaa@2026';

if ($username === $stored_username && $password === $stored_password) {
    // Generate a simple token (in a real app, use JWT)
    $token = base64_encode($username . ':' . time());
    echo json_encode(['success' => true, 'token' => $token]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'اسم المستخدم أو كلمة المرور غير صحيحة']);
}
?>
