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

function compressImage($source, $destination, $quality) {
    $info = getimagesize($source);
    if ($info['mime'] == 'image/jpeg') 
        $image = imagecreatefromjpeg($source);
    elseif ($info['mime'] == 'image/gif') 
        $image = imagecreatefromgif($source);
    elseif ($info['mime'] == 'image/png') 
        $image = imagecreatefrompng($source);
    elseif ($info['mime'] == 'image/webp')
        $image = imagecreatefromwebp($source);
    else return false;

    // Save image with compression
    if ($info['mime'] == 'image/png') {
        // PNG compression is 0-9
        $pngQuality = ($quality - 100) / 11.111111;
        $pngQuality = round(abs($pngQuality));
        imagepng($image, $destination, $pngQuality);
    } else {
        imagejpeg($image, $destination, $quality); // Convert to JPEG for best compression if possible, or keep format
    }
    
    imagedestroy($image);
    return true;
}

if ($method == 'POST') {
    checkAuth();
    
    $uploadDir = __DIR__ . '/../images/uploads/';
    
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
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
    
    $filename = uniqid('img_') . '.' . ($ext === 'svg' ? 'svg' : 'jpg'); // Convert to JPG to save space unless SVG
    $targetPath = $uploadDir . $filename;
    
    if ($ext === 'svg') {
        if (move_uploaded_file($_FILES[$fileKey]['tmp_name'], $targetPath)) {
            $url = '/images/uploads/' . $filename;
            echo json_encode(['success' => true, 'location' => $url, 'url' => $url]);
        }
    } else {
        // Compress image (75% quality)
        if (compressImage($_FILES[$fileKey]['tmp_name'], $targetPath, 75)) {
            $url = '/images/uploads/' . $filename;
            echo json_encode(['success' => true, 'location' => $url, 'url' => $url]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to compress and save image']);
        }
    }
}
?>
