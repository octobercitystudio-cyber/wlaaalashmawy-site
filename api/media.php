<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: GET, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('GET, DELETE, OPTIONS');

api_require_auth($pdo);

$method = $_SERVER['REQUEST_METHOD'] ?? '';
$uploadDir = __DIR__ . '/../images/uploads/';

if ($method === 'GET') {
    $files = [];
    if (is_dir($uploadDir)) {
        foreach (scandir($uploadDir) as $filename) {
            if (!preg_match('/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}\.(jpe?g|png|webp)$/i', $filename)) {
                continue;
            }
            $path = $uploadDir . $filename;
            if (!is_file($path)) {
                continue;
            }
            $files[] = [
                'name' => $filename,
                'url' => '/images/uploads/' . rawurlencode($filename),
                'size' => (int) filesize($path),
                'time' => (int) filemtime($path)
            ];
        }
    }

    usort($files, function ($a, $b) {
        return $b['time'] <=> $a['time'];
    });
    api_json_response($files);
}

if ($method === 'DELETE') {
    $filename = isset($_GET['file']) ? rawurldecode((string) $_GET['file']) : '';
    if (!preg_match('/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}\.(jpe?g|png|webp|gif|svg)$/i', $filename)) {
        api_json_response(['error' => 'Invalid filename'], 400);
    }

    $basePath = realpath($uploadDir);
    $filePath = realpath($uploadDir . $filename);
    if ($basePath === false || $filePath === false || dirname($filePath) !== $basePath || !is_file($filePath)) {
        api_json_response(['error' => 'File not found'], 404);
    }

    if (!unlink($filePath)) {
        api_json_response(['error' => 'Unable to delete file'], 500);
    }
    api_json_response(['success' => true]);
}

header('Allow: GET, DELETE, OPTIONS');
api_json_response(['error' => 'Method not allowed'], 405);
