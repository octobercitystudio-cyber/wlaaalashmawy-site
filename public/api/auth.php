<?php

require_once __DIR__ . '/security.php';

if (!function_exists('api_bearer_token')) {
    function api_bearer_token()
    {
        $authorization = api_get_header('Authorization');
        if (!preg_match('/^Bearer\s+([a-f0-9]{64})$/i', $authorization, $matches)) {
            return '';
        }
        return strtolower($matches[1]);
    }

    function api_is_authenticated($pdo)
    {
        $token = api_bearer_token();
        if ($token === '') {
            return false;
        }

        $tokenHash = hash('sha256', $token);
        $stmt = $pdo->prepare(
            'SELECT id FROM admin_sessions
             WHERE token_hash = ? AND expires_at > UTC_TIMESTAMP()
             LIMIT 1'
        );
        $stmt->execute([$tokenHash]);
        $sessionId = $stmt->fetchColumn();

        if (!$sessionId) {
            return false;
        }

        $pdo->prepare(
            'UPDATE admin_sessions
             SET last_used_at = UTC_TIMESTAMP()
             WHERE id = ? AND (last_used_at IS NULL OR last_used_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 5 MINUTE))'
        )->execute([(int) $sessionId]);

        return true;
    }

    function api_require_auth($pdo)
    {
        if (!api_is_authenticated($pdo)) {
            header('WWW-Authenticate: Bearer');
            api_json_response(['error' => 'Unauthorized'], 401);
        }
    }
}

