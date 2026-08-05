<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('GET, POST, PUT, DELETE, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'] ?? '';

function canonical_article_category($value)
{
    $categories = [
        'محاسبة' => 'Accounting',
        'مراجعة' => 'Audit',
        'ضرايب' => 'Taxes',
        'تأسيس الشركات والمنشآت' => 'Company Formation',
        'إقامات مستثمرين' => 'Investor Residency',
        'تراخيص صناعية' => 'Industrial Licensing'
    ];
    $category = api_plain_text($value ?? 'محاسبة', 100, true);
    if (!array_key_exists($category, $categories)) {
        api_json_response(['error' => 'Invalid article category'], 422);
    }
    return [$category, $categories[$category]];
}

function clean_article_payload($data)
{
    if (!array_key_exists('title', $data) || !array_key_exists('content', $data)) {
        api_json_response(['error' => 'Missing required fields'], 400);
    }

    $videoUrl = api_safe_url($data['video_url'] ?? '', false, 500);
    if ($videoUrl !== '') {
        $videoHost = strtolower((string) parse_url($videoUrl, PHP_URL_HOST));
        $allowedVideoHost = $videoHost === 'youtu.be'
            || $videoHost === 'youtube.com'
            || substr($videoHost, -12) === '.youtube.com';
        if (!$allowedVideoHost) {
            api_json_response(['error' => 'Only YouTube video URLs are allowed'], 422);
        }
    }

    [$category, $categoryEn] = canonical_article_category($data['category'] ?? 'محاسبة');

    return [
        'title' => api_plain_text($data['title'], 255, true),
        'title_en' => api_plain_text($data['title_en'] ?? '', 255),
        'date' => api_plain_text($data['date'] ?? date('d M Y'), 50, true),
        'category' => $category,
        'category_en' => $categoryEn,
        'image' => api_safe_url($data['image'] ?? '/images/articles/placeholder.jpg', true),
        'content' => api_sanitize_html($data['content'], 300000),
        'content_en' => api_sanitize_html($data['content_en'] ?? '', 300000),
        'video_url' => $videoUrl
    ];
}

if ($method === 'GET') {
    if (array_key_exists('id', $_GET)) {
        $id = api_positive_id($_GET['id']);
        $stmt = $pdo->prepare('SELECT * FROM articles WHERE id = ? LIMIT 1');
        $stmt->execute([$id]);
        $article = $stmt->fetch();
        if (!$article) {
            api_json_response(['error' => 'Article not found'], 404);
        }
        $article = api_sanitize_rows([$article], ['content', 'content_en'])[0];
        api_json_response($article);
    }

    $stmt = $pdo->query('SELECT * FROM articles ORDER BY id DESC');
    api_json_response(api_sanitize_rows($stmt->fetchAll(), ['content', 'content_en']));
}

if ($method === 'POST') {
    api_require_auth($pdo);
    $article = clean_article_payload(api_read_json());
    $stmt = $pdo->prepare(
        'INSERT INTO articles
            (title, title_en, date, category, category_en, image, content, content_en, video_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute(array_values($article));
    api_json_response(['success' => true, 'id' => (int) $pdo->lastInsertId()], 201);
}

if ($method === 'PUT') {
    api_require_auth($pdo);
    $data = api_read_json();
    $id = api_positive_id($data['id'] ?? null);
    if (!array_key_exists('date', $data)) {
        $dateStmt = $pdo->prepare('SELECT date FROM articles WHERE id = ?');
        $dateStmt->execute([$id]);
        $existingDate = $dateStmt->fetchColumn();
        if ($existingDate === false) {
            api_json_response(['error' => 'Article not found'], 404);
        }
        $data['date'] = $existingDate;
    }
    $article = clean_article_payload($data);

    $stmt = $pdo->prepare(
        'UPDATE articles
         SET title = ?, title_en = ?, date = ?, category = ?, category_en = ?,
             image = ?, content = ?, content_en = ?, video_url = ?
         WHERE id = ?'
    );
    $values = array_values($article);
    $values[] = $id;
    $stmt->execute($values);

    if ($stmt->rowCount() === 0) {
        $exists = $pdo->prepare('SELECT 1 FROM articles WHERE id = ?');
        $exists->execute([$id]);
        if (!$exists->fetchColumn()) {
            api_json_response(['error' => 'Article not found'], 404);
        }
    }
    api_json_response(['success' => true]);
}

if ($method === 'DELETE') {
    api_require_auth($pdo);
    $id = api_positive_id($_GET['id'] ?? null);
    $stmt = $pdo->prepare('DELETE FROM articles WHERE id = ?');
    $stmt->execute([$id]);
    if ($stmt->rowCount() === 0) {
        api_json_response(['error' => 'Article not found'], 404);
    }
    api_json_response(['success' => true]);
}

header('Allow: GET, POST, PUT, DELETE, OPTIONS');
api_json_response(['error' => 'Method not allowed'], 405);
