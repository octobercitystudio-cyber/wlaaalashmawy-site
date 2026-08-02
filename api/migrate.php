<?php

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Not found']);
    exit;
}

if (getenv('AFC_ALLOW_MAINTENANCE') !== '1') {
    fwrite(STDERR, "Maintenance commands are disabled. Set AFC_ALLOW_MAINTENANCE=1 for this process only.\n");
    exit(1);
}

require_once __DIR__ . '/db.php';

// db.php performs idempotent CREATE/ALTER operations only. Keeping migration
// here non-destructive prevents an accidental maintenance run from truncating
// editorial content.
fwrite(STDOUT, "Database schema is up to date.\n");
