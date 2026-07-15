<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

if ($method == 'POST') {
    checkAuth();
    
    $uploadDir = __DIR__ . '/../images/uploads/';
    
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    // Check if it's a TinyMCE upload (uses 'file') or custom upload (uses 'image')
    $fileKey = isset($_FILES['file']) ? 'file' : (isset($_FILES['image']) ? 'image' : null);
    
    if (!$fileKey || $_FILES[$fileKey]['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['error' => 'No file uploaded or upload error']);
        exit;
    }
    
    $fileInfo = pathinfo($_FILES[$fileKey]['name']);
    $ext = strtolower($fileInfo['extension']);
    $allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    
    if (!in_array($ext, $allowedExts)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file extension']);
        exit;
    }
    
    // Generate a unique filename
    $filename = uniqid('img_') . '.' . $ext;
    $targetPath = $uploadDir . $filename;
    
    if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $targetPath)) {
        $url = '/images/uploads/' . $filename;
        // TinyMCE expects { location: 'url' }
        echo json_encode([
            'success' => true,
            'location' => $url,
            'url' => $url
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to move uploaded file']);
    }
}
?>
