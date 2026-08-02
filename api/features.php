<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('GET, POST, PUT, DELETE, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'] ?? '';

function clean_feature_payload($data)
{
    if (!array_key_exists('title', $data) || !array_key_exists('description', $data)) {
        api_json_response(['error' => 'Missing required fields'], 400);
    }
    $icon = api_plain_text($data['icon'] ?? 'Target', 100, true);
    if (!preg_match('/^[A-Za-z][A-Za-z0-9-]{0,99}$/', $icon)) {
        api_json_response(['error' => 'Invalid icon'], 422);
    }

    return [
        'title' => api_plain_text($data['title'], 255, true),
        'description' => api_sanitize_html($data['description'], 20000),
        'icon' => $icon,
        'title_en' => api_plain_text($data['title_en'] ?? '', 255),
        'description_en' => api_sanitize_html($data['description_en'] ?? '', 20000)
    ];
}

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM features ORDER BY id ASC');
    api_json_response(api_sanitize_rows($stmt->fetchAll(), ['description', 'description_en']));
}

if ($method === 'POST') {
    api_require_auth($pdo);
    $feature = clean_feature_payload(api_read_json());
    $stmt = $pdo->prepare(
        'INSERT INTO features (title, description, icon, title_en, description_en)
         VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute(array_values($feature));
    api_json_response(['success' => true, 'id' => (int) $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    api_require_auth($pdo);
    $data = api_read_json();
    $id = api_positive_id($data['id'] ?? null);
    $feature = clean_feature_payload($data);
    $stmt = $pdo->prepare(
        'UPDATE features
         SET title = ?, description = ?, icon = ?, title_en = ?, description_en = ?
         WHERE id = ?'
    );
    $values = array_values($feature);
    $values[] = $id;
    $stmt->execute($values);
    api_json_response(['success' => true]);
}

if ($method === 'DELETE') {
    api_require_auth($pdo);
    $id = api_positive_id($_GET['id'] ?? null);
    $stmt = $pdo->prepare('DELETE FROM features WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        api_json_response(['error' => 'Feature not found'], 404);
    }
    api_json_response(['success' => true]);
}

header('Allow: GET, POST, PUT, DELETE, OPTIONS');
api_json_response(['error' => 'Method not allowed'], 405);
