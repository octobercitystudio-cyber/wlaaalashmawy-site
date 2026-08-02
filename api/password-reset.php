<?php

require_once __DIR__ . '/db.php';

api_handle_options('POST, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST, OPTIONS');
    api_json_response(['error' => 'Method not allowed'], 405);
}

$data = api_read_json();
$action = api_plain_text($data['action'] ?? '', 20, true);
$recoveryEmail = isset($admin_recovery_email)
    ? trim((string) $admin_recovery_email)
    : trim((string) (getenv('AFC_ADMIN_RECOVERY_EMAIL') ?: ''));

if (filter_var($recoveryEmail, FILTER_VALIDATE_EMAIL) === false) {
    error_log('Password reset requested before a recovery email was configured.');
    api_json_response(['error' => 'Password recovery is not configured'], 503);
}

$ipAddress = api_client_ip();
$rateKey = $ipAddress !== '' ? $ipAddress : 'unknown';

if ($action === 'request') {
    $requestCount = $pdo->prepare(
        'SELECT COUNT(*) FROM password_reset_codes
         WHERE ip_address = ?
           AND created_at >= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 HOUR)'
    );
    $requestCount->execute([$rateKey]);
    if ((int) $requestCount->fetchColumn() >= 3) {
        header('Retry-After: 3600');
        api_json_response(['error' => 'Too many reset requests. Try again later.'], 429);
    }

    $code = (string) random_int(100000, 999999);
    $codeHash = password_hash($code, PASSWORD_DEFAULT);

    try {
        $pdo->beginTransaction();
        $invalidate = $pdo->prepare(
            'UPDATE password_reset_codes
             SET used_at = UTC_TIMESTAMP()
             WHERE email = ? AND used_at IS NULL'
        );
        $invalidate->execute([$recoveryEmail]);
        $insert = $pdo->prepare(
            'INSERT INTO password_reset_codes
                (email, code_hash, ip_address, attempts, created_at, expires_at)
             VALUES (?, ?, ?, 0, UTC_TIMESTAMP(), DATE_ADD(UTC_TIMESTAMP(), INTERVAL 10 MINUTE))'
        );
        $insert->execute([$recoveryEmail, $codeHash, $rateKey]);
        $resetId = (int) $pdo->lastInsertId();
        $pdo->commit();
    } catch (Throwable $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log('Unable to create password reset code: ' . $e->getMessage());
        api_json_response(['error' => 'Unable to create a reset code'], 500);
    }

    $subject = 'AFC dashboard password reset code';
    $message = "A password reset was requested for the AFC website dashboard.\n\n"
        . "Verification code: {$code}\n"
        . "This code expires in 10 minutes and can only be used once.\n\n"
        . "If you did not request this change, ignore this message.";
    $headers = implode("\r\n", [
        'From: AFC Website <no-reply@afc-cpa.com>',
        'Reply-To: info@afc-cpa.com',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: AFC-Password-Recovery',
    ]);

    if (!mail($recoveryEmail, $subject, $message, $headers)) {
        $pdo->prepare(
            'UPDATE password_reset_codes SET used_at = UTC_TIMESTAMP() WHERE id = ?'
        )->execute([$resetId]);
        error_log('Password reset email could not be queued for delivery.');
        api_json_response(['error' => 'Unable to send the reset email'], 503);
    }

    api_json_response([
        'success' => true,
        'expires_in' => 600,
    ]);
}

if ($action !== 'reset') {
    api_json_response(['error' => 'Invalid reset action'], 422);
}

$code = api_plain_text($data['code'] ?? '', 6, true);
$newPassword = isset($data['password']) && is_string($data['password'])
    ? $data['password']
    : '';

if (!preg_match('/^[0-9]{6}$/', $code)) {
    api_json_response(['error' => 'Invalid or expired verification code'], 422);
}
if (strlen($newPassword) < 12 || strlen($newPassword) > 4096) {
    api_json_response(['error' => 'Password must be at least 12 characters'], 422);
}

try {
    $pdo->beginTransaction();
    $codeStmt = $pdo->prepare(
        'SELECT id, code_hash, attempts
         FROM password_reset_codes
         WHERE email = ? AND used_at IS NULL AND expires_at > UTC_TIMESTAMP()
         ORDER BY id DESC LIMIT 1 FOR UPDATE'
    );
    $codeStmt->execute([$recoveryEmail]);
    $reset = $codeStmt->fetch();

    if (!$reset || (int) $reset['attempts'] >= 5) {
        $pdo->rollBack();
        api_json_response(['error' => 'Invalid or expired verification code'], 422);
    }

    $pdo->prepare(
        'UPDATE password_reset_codes SET attempts = attempts + 1 WHERE id = ?'
    )->execute([(int) $reset['id']]);

    if (!password_verify($code, (string) $reset['code_hash'])) {
        $pdo->commit();
        usleep(random_int(150000, 350000));
        api_json_response(['error' => 'Invalid or expired verification code'], 422);
    }

    $saveSetting = $pdo->prepare(
        'INSERT INTO settings (setting_key, setting_value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)'
    );
    $saveSetting->execute(['admin_password', password_hash($newPassword, PASSWORD_DEFAULT)]);
    $saveSetting->execute(['admin_password_source', 'database']);
    $pdo->prepare(
        'UPDATE password_reset_codes SET used_at = UTC_TIMESTAMP() WHERE id = ?'
    )->execute([(int) $reset['id']]);
    $pdo->exec('DELETE FROM admin_sessions');
    $pdo->exec('DELETE FROM login_attempts');
    $pdo->commit();
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('Password reset failed: ' . $e->getMessage());
    api_json_response(['error' => 'Unable to reset the password'], 500);
}

api_json_response(['success' => true]);
