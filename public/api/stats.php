<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('GET, POST, PUT, DELETE, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'] ?? '';

function clean_stat_payload($data)
{
    if (!array_key_exists('title', $data) || !array_key_exists('value', $data)) {
        api_json_response(['error' => 'Missing required fields'], 400);
    }
    return [
        'title' => api_plain_text($data['title'], 255, true),
        'value' => api_plain_text($data['value'], 100, true),
        'title_en' => api_plain_text($data['title_en'] ?? '', 255),
        'value_en' => api_plain_text($data['value_en'] ?? '', 100)
    ];
}

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT * FROM stats ORDER BY id ASC');
    api_json_response(api_sanitize_rows($stmt->fetchAll()));
}

if ($method === 'POST') {
    api_require_auth($pdo);
    $stat = clean_stat_payload(api_read_json());
    $stmt = $pdo->prepare(
        'INSERT INTO stats (title, value, title_en, value_en) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute(array_values($stat));
    api_json_response(['success' => true, 'id' => (int) $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    api_require_auth($pdo);
    $data = api_read_json();
    $id = api_positive_id($data['id'] ?? null);
    $stat = clean_stat_payload($data);
    $stmt = $pdo->prepare(
        'UPDATE stats SET title = ?, value = ?, title_en = ?, value_en = ? WHERE id = ?'
    );
    $values = array_values($stat);
    $values[] = $id;
    $stmt->execute($values);
    api_json_response(['success' => true]);
}

if ($method === 'DELETE') {
    api_require_auth($pdo);
    $id = api_positive_id($_GET['id'] ?? null);
    $stmt = $pdo->prepare('DELETE FROM stats WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        api_json_response(['error' => 'Stat not found'], 404);
    }
    api_json_response(['success' => true]);
}

header('Allow: GET, POST, PUT, DELETE, OPTIONS');
api_json_response(['error' => 'Method not allowed'], 405);
