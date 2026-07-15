<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, DELETE, OPTIONS');
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

$uploadDir = __DIR__ . '/../images/uploads/';

if ($method == 'GET') {
    checkAuth();
    
    $files = [];
    if (file_exists($uploadDir)) {
        $scanned_dir = array_diff(scandir($uploadDir), array('..', '.'));
        foreach ($scanned_dir as $file) {
            $files[] = [
                'name' => $file,
                'url' => '/images/uploads/' . $file,
                'size' => filesize($uploadDir . $file),
                'time' => filemtime($uploadDir . $file)
            ];
        }
    }
    
    // Sort by newest first
    usort($files, function($a, $b) {
        return $b['time'] - $a['time'];
    });
    
    echo json_encode($files);
} 
elseif ($method == 'DELETE') {
    checkAuth();
    
    $filename = isset($_GET['file']) ? $_GET['file'] : '';
    $filename = basename($filename); // prevent directory traversal
    
    if (empty($filename)) {
        http_response_code(400);
        echo json_encode(['error' => 'No file specified']);
        exit;
    }
    
    $filePath = $uploadDir . $filename;
    
    if (file_exists($filePath)) {
        unlink($filePath);
        echo json_encode(['success' => true]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'File not found']);
    }
}
?>
