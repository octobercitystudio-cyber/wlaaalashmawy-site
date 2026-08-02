<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('GET, POST, PUT, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'] ?? '';

function is_sensitive_setting_key($key)
{
    return preg_match('/(^admin_password$|password|secret|token|private|credential|api[_-]?key)/i', $key) === 1;
}

function sanitize_public_setting($key, $value)
{
    $value = (string) $value;

    if (preg_match('/^(social_|contact_map$)/', $key)) {
        if ($value === '') {
            return '';
        }
        $scheme = strtolower((string) parse_url($value, PHP_URL_SCHEME));
        return filter_var($value, FILTER_VALIDATE_URL) !== false && $scheme === 'https' ? $value : '';
    }

    if (preg_match('/(_image$|_logo$)/', $key)) {
        return api_safe_url($value, true, 1000);
    }

    if (preg_match('/^(about_|vision|mission|hero_)/', $key)) {
        return api_sanitize_html($value);
    }

    if (preg_match('/^(seo_|contact_address)/', $key)) {
        return api_plain_text($value, 5000, false);
    }

    return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
}

if ($method === 'GET') {
    $isAdmin = api_is_authenticated($pdo);
    $stmt = $pdo->query('SELECT setting_key, setting_value FROM settings ORDER BY setting_key ASC');
    $settings = [];

    foreach ($stmt->fetchAll() as $row) {
        $key = (string) $row['setting_key'];

        // Passwords, tokens, secrets and credentials are never returned by this endpoint.
        if (is_sensitive_setting_key($key)) {
            continue;
        }

        if (!$isAdmin && strpos($key, 'admin_') === 0) {
            continue;
        }

        $settings[$key] = sanitize_public_setting($key, $row['setting_value']);
    }

    if ($isAdmin && empty($settings['admin_username']) && !empty($admin_username)) {
        $settings['admin_username'] = api_plain_text($admin_username, 100, false);
    }

    api_json_response($settings);
}

if ($method !== 'POST' && $method !== 'PUT') {
    header('Allow: GET, POST, PUT, OPTIONS');
    api_json_response(['error' => 'Method not allowed'], 405);
}

api_require_auth($pdo);
$data = api_read_json();

if (count($data) > 100) {
    api_json_response(['error' => 'Too many settings in one request'], 422);
}

$updates = [];
$credentialsChanged = false;
$currentAdminUsername = '';
if (array_key_exists('admin_username', $data)) {
    $currentUsernameStmt = $pdo->prepare(
        "SELECT setting_value FROM settings WHERE setting_key = 'admin_username' LIMIT 1"
    );
    $currentUsernameStmt->execute();
    $currentAdminUsername = (string) (
        $currentUsernameStmt->fetchColumn()
        ?: ($admin_username ?? '')
    );
}

foreach ($data as $key => $value) {
    if (!is_string($key) || !preg_match('/^[a-z][a-z0-9_]{0,99}$/', $key)) {
        api_json_response(['error' => 'Invalid setting key'], 422);
    }
    if (!is_scalar($value) && $value !== null) {
        api_json_response(['error' => 'Invalid setting value'], 422);
    }

    $value = (string) $value;

    if ($key === 'admin_password') {
        // A blank field means "leave the current password unchanged".
        if ($value === '') {
            continue;
        }
        if (strlen($value) < 12 || strlen($value) > 4096) {
            api_json_response(['error' => 'Admin password must be at least 12 characters'], 422);
        }
        $updates[$key] = password_hash($value, PASSWORD_DEFAULT);
        $updates['admin_password_source'] = 'database';
        $credentialsChanged = true;
        continue;
    }

    if ($key === 'admin_username') {
        $updates[$key] = api_plain_text($value, 100, true);
        if (strlen($updates[$key]) < 3) {
            api_json_response(['error' => 'Admin username is too short'], 422);
        }
        $credentialsChanged = $credentialsChanged
            || !hash_equals($currentAdminUsername, $updates[$key]);
        continue;
    }

    if (is_sensitive_setting_key($key)) {
        api_json_response(['error' => 'This setting cannot be changed through the public API'], 403);
    }

    if (preg_match('/(_image$|_logo$)/', $key)) {
        $updates[$key] = api_safe_url($value, true, 1000);
    } elseif (preg_match('/^(social_|contact_map$)/', $key)) {
        $updates[$key] = api_safe_url($value, false, 1000);
    } elseif (in_array($key, ['contact_emails', 'contact_phones', 'article_categories'], true)) {
        $decoded = json_decode($value, true);
        if (!is_array($decoded) || count($decoded) > 100) {
            api_json_response(['error' => 'Invalid list setting'], 422);
        }
        $clean = [];
        foreach ($decoded as $item) {
            $item = api_plain_text($item, 255, false);
            if ($item !== '') {
                $clean[] = $item;
            }
        }
        $updates[$key] = json_encode(array_values($clean), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    } elseif (preg_match('/^(seo_|contact_address)/', $key)) {
        $updates[$key] = api_plain_text($value, 5000, false);
    } else {
        $updates[$key] = api_sanitize_html($value);
    }
}

if (!$updates) {
    api_json_response(['success' => true]);
}

$stmt = $pdo->prepare(
    'INSERT INTO settings (setting_key, setting_value)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)'
);

try {
    $pdo->beginTransaction();
    foreach ($updates as $key => $value) {
        $stmt->execute([$key, $value]);
    }
    if ($credentialsChanged) {
        $pdo->exec('DELETE FROM admin_sessions');
    }
    $pdo->commit();
    api_json_response([
        'success' => true,
        'reauthenticate' => $credentialsChanged
    ]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('Settings update failed: ' . $e->getMessage());
    api_json_response(['error' => 'Unable to save settings'], 500);
}
