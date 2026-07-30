<?php

require_once __DIR__ . '/db.php';

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
api_handle_options('POST, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST, OPTIONS');
    api_json_response(['error' => 'Method not allowed'], 405);
}

$data = api_read_json();
$rawPath = isset($data['path']) && is_string($data['path']) ? trim($data['path']) : '';
$visitor = isset($data['visitor']) && is_string($data['visitor']) ? trim($data['visitor']) : '';

// Store only a normalized route. Query strings can contain personal data and are not needed for analytics.
$path = parse_url($rawPath, PHP_URL_PATH);
if (!is_string($path) || $path === '' || strlen($path) > 255) {
    api_json_response(['error' => 'Invalid path'], 422);
}
$path = rawurldecode($path);
if (!preg_match('#^/[A-Za-z0-9/_\-.]*$#', $path)) {
    api_json_response(['error' => 'Invalid path'], 422);
}

if (!preg_match('/^[A-Za-z0-9_-]{10,100}$/', $visitor)) {
    api_json_response(['error' => 'Invalid visitor identifier'], 422);
}

try {
    $rate = $pdo->prepare(
        'SELECT COUNT(*) FROM visits
         WHERE visited_at >= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 MINUTE)
           AND visitor_id = ?'
    );
    $rate->execute([$visitor]);
    if ((int) $rate->fetchColumn() >= 60) {
        header('Retry-After: 60');
        api_json_response(['error' => 'Too many tracking requests'], 429);
    }

    // Ignore immediate duplicate route events from React remounts or retries.
    $duplicate = $pdo->prepare(
        'SELECT 1 FROM visits
         WHERE visitor_id = ? AND page_path = ?
           AND visited_at >= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 10 SECOND)
         LIMIT 1'
    );
    $duplicate->execute([$visitor, $path]);
    if ($duplicate->fetchColumn()) {
        api_json_response(['success' => true, 'deduplicated' => true]);
    }

    $stmt = $pdo->prepare(
        'INSERT INTO visits (page_path, visitor_id, ip_address) VALUES (?, ?, ?)'
    );
    // Page analytics deliberately avoid storing the visitor's raw IP address.
    $stmt->execute([$path, $visitor, '']);
    api_json_response(['success' => true], 201);
} catch (Throwable $e) {
    error_log('Visitor tracking failed: ' . $e->getMessage());
    api_json_response(['error' => 'Unable to record visit'], 500);
}
