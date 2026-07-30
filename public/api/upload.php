<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('POST, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST, OPTIONS');
    api_json_response(['error' => 'Method not allowed'], 405);
}

api_require_auth($pdo);

$uploadDir = __DIR__ . '/../images/uploads/';
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
    api_json_response(['error' => 'Upload directory is unavailable'], 500);
}

// Apache defense in depth for old files that may already exist in this directory.
$accessRules = <<<'HTACCESS'
Options -Indexes -ExecCGI
<FilesMatch "\.(php[0-9]?|phtml|phar|cgi|pl|py|sh|svg|svgz)$">
    Require all denied
</FilesMatch>
HTACCESS;
if (!file_exists($uploadDir . '.htaccess')) {
    @file_put_contents($uploadDir . '.htaccess', $accessRules, LOCK_EX);
}

$fileKey = isset($_FILES['file']) ? 'file' : (isset($_FILES['image']) ? 'image' : null);
if ($fileKey === null || !isset($_FILES[$fileKey]['error'])) {
    api_json_response(['error' => 'No file was uploaded'], 400);
}

$file = $_FILES[$fileKey];
if ((int) $file['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($file['tmp_name'])) {
    api_json_response(['error' => 'Upload failed'], 400);
}

$maxBytes = 5 * 1024 * 1024;
if ((int) $file['size'] <= 0 || (int) $file['size'] > $maxBytes) {
    api_json_response(['error' => 'Image must be no larger than 5 MB'], 413);
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = (string) $finfo->file($file['tmp_name']);
$allowed = [
    'image/jpeg' => ['extension' => 'jpg', 'loader' => 'imagecreatefromjpeg'],
    'image/png' => ['extension' => 'png', 'loader' => 'imagecreatefrompng'],
    'image/webp' => ['extension' => 'webp', 'loader' => 'imagecreatefromwebp']
];

// SVG and all non-raster formats are intentionally rejected.
if (!isset($allowed[$mime])) {
    api_json_response(['error' => 'Only JPEG, PNG and WebP images are allowed'], 415);
}

$imageInfo = @getimagesize($file['tmp_name']);
if ($imageInfo === false || ($imageInfo['mime'] ?? '') !== $mime) {
    api_json_response(['error' => 'The uploaded file is not a valid image'], 415);
}

$width = (int) $imageInfo[0];
$height = (int) $imageInfo[1];
if ($width < 1 || $height < 1 || $width > 8000 || $height > 8000 || ($width * $height) > 25000000) {
    api_json_response(['error' => 'Image dimensions are not allowed'], 422);
}

$loader = $allowed[$mime]['loader'];
if (!function_exists($loader)) {
    api_json_response(['error' => 'Image processing is unavailable'], 503);
}

$image = @$loader($file['tmp_name']);
if ($image === false) {
    api_json_response(['error' => 'Unable to decode the image'], 415);
}

$extension = $allowed[$mime]['extension'];
$filename = 'img_' . bin2hex(random_bytes(16)) . '.' . $extension;
$targetPath = $uploadDir . $filename;
$saved = false;

if ($mime === 'image/jpeg') {
    $saved = imagejpeg($image, $targetPath, 82);
} elseif ($mime === 'image/png') {
    imagealphablending($image, false);
    imagesavealpha($image, true);
    $saved = imagepng($image, $targetPath, 7);
} elseif ($mime === 'image/webp' && function_exists('imagewebp')) {
    $saved = imagewebp($image, $targetPath, 82);
}

imagedestroy($image);

if (!$saved || !is_file($targetPath)) {
    @unlink($targetPath);
    api_json_response(['error' => 'Unable to save the image'], 500);
}

@chmod($targetPath, 0644);
$url = '/images/uploads/' . $filename;
api_json_response([
    'success' => true,
    'location' => $url,
    'url' => $url
], 201);
