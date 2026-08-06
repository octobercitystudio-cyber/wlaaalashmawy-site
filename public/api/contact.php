<?php

require_once __DIR__ . '/db.php';

api_handle_options('POST, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST, OPTIONS');
    api_json_response(['error' => 'Method not allowed'], 405);
}

$data = api_read_json();

// A filled hidden field indicates an automated submission. Return a neutral
// success response so bots do not learn how the form is protected.
$website = api_plain_text($data['website'] ?? '', 200);
if ($website !== '') {
    api_json_response(['success' => true]);
}

$name = api_plain_text($data['name'] ?? '', 120, true);
$email = api_plain_text($data['email'] ?? '', 160, true);
$phone = api_plain_text($data['phone'] ?? '', 30, true);
$inquiry = api_plain_text($data['inquiry'] ?? '', 120, true);
$message = api_plain_text($data['message'] ?? '', 2000, true);
$language = api_plain_text($data['language'] ?? 'ar', 2);

if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    api_json_response(['error' => 'Invalid email address'], 422);
}
if (!preg_match('/^[0-9+()\- .]{7,30}$/', $phone)) {
    api_json_response(['error' => 'Invalid phone number'], 422);
}
if (!in_array($language, ['ar', 'en'], true)) {
    $language = 'ar';
}

$ipAddress = api_client_ip();
$ipHash = hash('sha256', $ipAddress !== '' ? $ipAddress : 'unknown');
$recentSubmissions = $pdo->prepare(
    'SELECT COUNT(*) FROM contact_rate_limits
     WHERE ip_hash = ? AND submitted_at >= DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 HOUR)'
);
$recentSubmissions->execute([$ipHash]);
if ((int) $recentSubmissions->fetchColumn() >= 5) {
    header('Retry-After: 3600');
    api_json_response(['error' => 'Too many contact requests'], 429);
}

$settings = $pdo->query(
    "SELECT setting_key, setting_value FROM settings
     WHERE setting_key IN ('contact_emails', 'contact_email')"
)->fetchAll(PDO::FETCH_KEY_PAIR);

$recipientCandidates = [];
if (!empty($settings['contact_emails'])) {
    $decodedEmails = json_decode((string) $settings['contact_emails'], true);
    if (is_array($decodedEmails)) {
        $recipientCandidates = $decodedEmails;
    }
}
if (!empty($settings['contact_email'])) {
    $recipientCandidates[] = $settings['contact_email'];
}
$recipientCandidates[] = 'info@afc-cpa.com';

$recipient = '';
foreach ($recipientCandidates as $candidate) {
    $candidate = trim((string) $candidate);
    if (filter_var($candidate, FILTER_VALIDATE_EMAIL) !== false) {
        $recipient = $candidate;
        break;
    }
}
if ($recipient === '') {
    error_log('Contact form email could not be sent because no recipient is configured.');
    api_json_response(['error' => 'Contact email is not configured'], 503);
}

$submittedAt = gmdate('Y-m-d H:i:s') . ' UTC';
$emailBody = $language === 'en'
    ? "A new message was submitted through the AFC website.\n\n"
        . "Name: {$name}\n"
        . "Email: {$email}\n"
        . "Phone: {$phone}\n"
        . "Inquiry type: {$inquiry}\n"
        . "Submitted at: {$submittedAt}\n\n"
        . "Message:\n{$message}\n"
    : "تم استلام رسالة جديدة من استمارة التواصل بموقع AFC.\n\n"
        . "الاسم: {$name}\n"
        . "البريد الإلكتروني: {$email}\n"
        . "رقم الهاتف: {$phone}\n"
        . "نوع الاستفسار: {$inquiry}\n"
        . "وقت الإرسال: {$submittedAt}\n\n"
        . "تفاصيل الرسالة:\n{$message}\n";

$subjectText = $language === 'en'
    ? 'New contact request from AFC website'
    : 'رسالة تواصل جديدة من موقع AFC';
$subject = function_exists('mb_encode_mimeheader')
    ? mb_encode_mimeheader($subjectText, 'UTF-8')
    : $subjectText;
$headers = implode("\r\n", [
    'From: AFC Website <no-reply@afc-cpa.com>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: AFC-Contact-Form',
]);

if (!mail($recipient, $subject, $emailBody, $headers)) {
    error_log('Contact form email could not be queued for delivery.');
    api_json_response(['error' => 'Unable to send contact email'], 503);
}

$pdo->prepare('INSERT INTO contact_rate_limits (ip_hash) VALUES (?)')->execute([$ipHash]);

api_json_response(['success' => true]);
