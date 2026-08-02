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

// Remote workflow dispatch from a public PHP endpoint is intentionally disabled.
// Deployments must be started from the protected GitHub Actions interface.
api_json_response([
    'error' => 'Remote deployment is disabled. Use the protected deployment workflow.'
], 410);
