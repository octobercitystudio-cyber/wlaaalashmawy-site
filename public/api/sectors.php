<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('GET, POST, PUT, DELETE, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'] ?? '';

function clean_sector_payload($data)
{
    if (!array_key_exists('title', $data) || !array_key_exists('content', $data)) {
        api_json_response(['error' => 'Missing required fields'], 400);
    }

    return [
        'title' => api_plain_text($data['title'], 255, true),
        'title_en' => api_plain_text($data['title_en'] ?? '', 255),
        'image' => api_safe_url($data['image'] ?? '/images/sectors/placeholder.jpg', true),
        'description' => api_sanitize_html($data['description'] ?? '', 20000),
        'description_en' => api_sanitize_html($data['description_en'] ?? '', 20000),
        'content' => api_sanitize_html($data['content'], 200000),
        'content_en' => api_sanitize_html($data['content_en'] ?? '', 200000)
    ];
}

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM sectors ORDER BY id ASC');
    api_json_response(api_sanitize_rows(
        $stmt->fetchAll(),
        ['description', 'description_en', 'content', 'content_en']
    ));
}

if ($method === 'POST') {
    api_require_auth($pdo);
    $sector = clean_sector_payload(api_read_json());
    $stmt = $pdo->prepare(
        'INSERT INTO sectors
            (title, title_en, image, description, description_en, content, content_en)
         VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute(array_values($sector));
    api_json_response(['success' => true, 'id' => (int) $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    api_require_auth($pdo);
    $data = api_read_json();
    $id = api_positive_id($data['id'] ?? null);
    $sector = clean_sector_payload($data);
    $stmt = $pdo->prepare(
        'UPDATE sectors
         SET title = ?, title_en = ?, image = ?, description = ?,
             description_en = ?, content = ?, content_en = ?
         WHERE id = ?'
    );
    $values = array_values($sector);
    $values[] = $id;
    $stmt->execute($values);
    api_json_response(['success' => true]);
}

if ($method === 'DELETE') {
    api_require_auth($pdo);
    $id = api_positive_id($_GET['id'] ?? null);
    $stmt = $pdo->prepare('DELETE FROM sectors WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        api_json_response(['error' => 'Sector not found'], 404);
    }
    api_json_response(['success' => true]);
}

header('Allow: GET, POST, PUT, DELETE, OPTIONS');
api_json_response(['error' => 'Method not allowed'], 405);
