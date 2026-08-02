<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('GET, POST, PUT, DELETE, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'] ?? '';

function clean_testimonial_payload($data)
{
    if (!array_key_exists('name', $data) || !array_key_exists('content', $data)) {
        api_json_response(['error' => 'Missing required fields'], 400);
    }
    $rating = filter_var($data['rating'] ?? 5, FILTER_VALIDATE_INT);
    if ($rating === false || $rating < 1 || $rating > 5) {
        api_json_response(['error' => 'Rating must be between 1 and 5'], 422);
    }
    $isVerified = filter_var(
        $data['is_verified'] ?? false,
        FILTER_VALIDATE_BOOLEAN,
        FILTER_NULL_ON_FAILURE
    );
    if ($isVerified === null) {
        api_json_response(['error' => 'Invalid verification status'], 422);
    }

    return [
        'name' => api_plain_text($data['name'], 255, true),
        'position' => api_plain_text($data['position'] ?? '', 255),
        'content' => api_plain_text($data['content'], 20000, true),
        'rating' => $rating,
        'name_en' => api_plain_text($data['name_en'] ?? '', 255),
        'position_en' => api_plain_text($data['position_en'] ?? '', 255),
        'content_en' => api_plain_text($data['content_en'] ?? '', 20000),
        'image' => api_safe_url($data['image'] ?? '', true, 500),
        'is_verified' => $isVerified ? 1 : 0
    ];
}

if ($method === 'GET') {
    $query = api_is_authenticated($pdo)
        ? 'SELECT * FROM testimonials ORDER BY id ASC'
        : 'SELECT * FROM testimonials WHERE is_verified = 1 ORDER BY id ASC';
    $stmt = $pdo->query($query);
    api_json_response(api_sanitize_rows($stmt->fetchAll()));
}

if ($method === 'POST') {
    api_require_auth($pdo);
    $testimonial = clean_testimonial_payload(api_read_json());
    $stmt = $pdo->prepare(
        'INSERT INTO testimonials
            (name, position, content, rating, name_en, position_en, content_en, image, is_verified)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute(array_values($testimonial));
    api_json_response(['success' => true, 'id' => (int) $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    api_require_auth($pdo);
    $data = api_read_json();
    $id = api_positive_id($data['id'] ?? null);
    $testimonial = clean_testimonial_payload($data);
    $stmt = $pdo->prepare(
        'UPDATE testimonials
         SET name = ?, position = ?, content = ?, rating = ?,
             name_en = ?, position_en = ?, content_en = ?, image = ?, is_verified = ?
         WHERE id = ?'
    );
    $values = array_values($testimonial);
    $values[] = $id;
    $stmt->execute($values);
    api_json_response(['success' => true]);
}

if ($method === 'DELETE') {
    api_require_auth($pdo);
    $id = api_positive_id($_GET['id'] ?? null);
    $stmt = $pdo->prepare('DELETE FROM testimonials WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        api_json_response(['error' => 'Testimonial not found'], 404);
    }
    api_json_response(['success' => true]);
}

header('Allow: GET, POST, PUT, DELETE, OPTIONS');
api_json_response(['error' => 'Method not allowed'], 405);
