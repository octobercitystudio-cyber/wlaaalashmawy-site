<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

api_handle_options('GET, POST, DELETE, OPTIONS');

$method = $_SERVER['REQUEST_METHOD'] ?? '';

if ($method === 'GET') {
    api_require_auth($pdo);
    api_json_response(['authenticated' => true]);
}

if ($method === 'DELETE') {
    $token = api_bearer_token();
    if ($token !== '') {
        $stmt = $pdo->prepare('DELETE FROM admin_sessions WHERE token_hash = ?');
        $stmt->execute([hash('sha256', $token)]);
    }
    api_json_response(['success' => true]);
}

if ($method !== 'POST') {
    header('Allow: GET, POST, DELETE, OPTIONS');
    api_json_response(['error' => 'Method not allowed'], 405);
}

$data = api_read_json();
$username = api_plain_text($data['username'] ?? '', 100, true);
$password = isset($data['password']) && is_string($data['password']) ? $data['password'] : '';

if ($password === '' || strlen($password) > 4096) {
    api_json_response(['error' => 'Invalid credentials'], 401);
}

$ipAddress = api_client_ip();
$rateKey = $ipAddress !== '' ? $ipAddress : 'unknown';

$attempts = $pdo->prepare(
    'SELECT COUNT(*) FROM login_attempts
     WHERE ip_address = ? AND successful = 0
       AND attempted_at >= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 15 MINUTE)'
);
$attempts->execute([$rateKey]);
if ((int) $attempts->fetchColumn() >= 5) {
    header('Retry-After: 900');
    api_json_response(['error' => 'Too many login attempts. Try again later.'], 429);
}

$stmt = $pdo->query(
    "SELECT setting_key, setting_value
     FROM settings
     WHERE setting_key IN ('admin_username', 'admin_password', 'admin_password_source')"
);
$settings = [];
foreach ($stmt->fetchAll() as $row) {
    $settings[$row['setting_key']] = trim((string) $row['setting_value']);
}

$configuredUsername = isset($admin_username)
    ? (string) $admin_username
    : (getenv('AFC_ADMIN_USERNAME') ?: '');
$configuredPassword = isset($admin_password_hash)
    ? (string) $admin_password_hash
    : (getenv('AFC_ADMIN_PASSWORD_HASH') ?: '');
$databaseUsername = $settings['admin_username'] ?? '';
$databasePassword = $settings['admin_password'] ?? '';
$databasePasswordIsAuthoritative = ($settings['admin_password_source'] ?? '') === 'database';
$databasePasswordInfo = password_get_info($databasePassword);
$configuredPasswordInfo = password_get_info($configuredPassword);

if ($databasePasswordIsAuthoritative && !empty($databasePasswordInfo['algo'])) {
    $storedUsername = $databaseUsername !== ''
        ? $databaseUsername
        : $configuredUsername;
    $storedPassword = $databasePassword;
} elseif (!empty($configuredPasswordInfo['algo'])) {
    // The protected deployment credential is authoritative, which also makes
    // deployment-time recovery possible without exposing database hashes.
    $storedUsername = $configuredUsername !== ''
        ? $configuredUsername
        : $databaseUsername;
    $storedPassword = $configuredPassword;
} elseif (!empty($databasePasswordInfo['algo'])) {
    $storedUsername = $databaseUsername;
    $storedPassword = $databasePassword;
} else {
    $storedUsername = '';
    $storedPassword = '';
}

if ($storedUsername === '' || $storedPassword === '') {
    error_log('Admin login attempted before credentials were configured.');
    api_json_response(['error' => 'Admin credentials are not configured'], 503);
}

$passwordMatches = password_verify($password, $storedPassword);
$usernameMatches = hash_equals($storedUsername, $username);
$authenticated = $usernameMatches && $passwordMatches;

$pdo->prepare(
    'INSERT INTO login_attempts (ip_address, successful) VALUES (?, ?)'
)->execute([$rateKey, $authenticated ? 1 : 0]);

if (!$authenticated) {
    usleep(random_int(150000, 350000));
    api_json_response(['error' => 'Invalid credentials'], 401);
}

$pdo->prepare('DELETE FROM login_attempts WHERE ip_address = ?')->execute([$rateKey]);
$pdo->prepare(
    'DELETE FROM admin_sessions
     WHERE username = ? OR expires_at <= UTC_TIMESTAMP()'
)->execute([$storedUsername]);

$token = bin2hex(random_bytes(32));
$tokenHash = hash('sha256', $token);
$session = $pdo->prepare(
    'INSERT INTO admin_sessions
        (token_hash, username, ip_address, created_at, last_used_at, expires_at)
     VALUES (?, ?, ?, UTC_TIMESTAMP(), UTC_TIMESTAMP(), DATE_ADD(UTC_TIMESTAMP(), INTERVAL 8 HOUR))'
);
$session->execute([$tokenHash, $storedUsername, $ipAddress]);

api_json_response([
    'success' => true,
    'token' => $token,
    'expires_in' => 28800
]);
