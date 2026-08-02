<?php

if (!function_exists('api_json_response')) {
    function api_json_response($payload, $status = 200)
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    function api_get_header($name)
    {
        $target = strtolower($name);

        if (function_exists('getallheaders')) {
            foreach (getallheaders() as $key => $value) {
                if (strtolower($key) === $target) {
                    return trim((string) $value);
                }
            }
        }

        $serverKey = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
        return isset($_SERVER[$serverKey]) ? trim((string) $_SERVER[$serverKey]) : '';
    }

    function api_apply_security_headers()
    {
        header('Content-Type: application/json; charset=utf-8');
        header('X-Content-Type-Options: nosniff');
        header('Referrer-Policy: same-origin');
        header('Cache-Control: no-store');

        $origin = isset($_SERVER['HTTP_ORIGIN']) ? trim((string) $_SERVER['HTTP_ORIGIN']) : '';
        if ($origin === '') {
            return;
        }

        $allowed = [];
        $configured = getenv('AFC_ALLOWED_ORIGINS');
        if (is_string($configured) && $configured !== '') {
            foreach (explode(',', $configured) as $configuredOrigin) {
                $configuredOrigin = rtrim(trim($configuredOrigin), '/');
                if ($configuredOrigin !== '') {
                    $allowed[] = $configuredOrigin;
                }
            }
        }

        $host = isset($_SERVER['HTTP_HOST']) ? preg_replace('/[^A-Za-z0-9.:\-\[\]]/', '', $_SERVER['HTTP_HOST']) : '';
        if ($host !== '') {
            $allowed[] = 'https://' . $host;
            $allowed[] = 'http://' . $host;
        }

        if (in_array(rtrim($origin, '/'), array_unique($allowed), true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
        }
    }

    function api_handle_options($methods)
    {
        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'OPTIONS') {
            return;
        }

        header('Access-Control-Allow-Methods: ' . $methods);
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Max-Age: 600');
        http_response_code(204);
        exit;
    }

    function api_read_json()
    {
        $raw = file_get_contents('php://input');
        if (!is_string($raw) || strlen($raw) > 1048576) {
            api_json_response(['error' => 'Request body is too large'], 413);
        }

        $data = json_decode($raw, true);
        if (!is_array($data) || json_last_error() !== JSON_ERROR_NONE) {
            api_json_response(['error' => 'Invalid JSON body'], 400);
        }

        return $data;
    }

    function api_plain_text($value, $maxLength = 255, $required = false)
    {
        if (!is_scalar($value) && $value !== null) {
            api_json_response(['error' => 'Invalid field value'], 400);
        }

        $text = trim(strip_tags((string) $value));
        $text = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $text);
        if ($required && $text === '') {
            api_json_response(['error' => 'A required field is empty'], 400);
        }

        if (function_exists('mb_strlen')) {
            if (mb_strlen($text, 'UTF-8') > $maxLength) {
                api_json_response(['error' => 'A field exceeds the allowed length'], 422);
            }
        } elseif (strlen($text) > $maxLength) {
            api_json_response(['error' => 'A field exceeds the allowed length'], 422);
        }

        return $text;
    }

    function api_sanitize_html($value, $maxLength = 200000)
    {
        if (!is_scalar($value) && $value !== null) {
            api_json_response(['error' => 'Invalid content value'], 400);
        }

        $html = (string) $value;
        if (strlen($html) > $maxLength) {
            api_json_response(['error' => 'Content exceeds the allowed length'], 422);
        }

        $html = preg_replace('#<(script|style|iframe|object|embed|form|input|button|textarea|select|meta|link)[^>]*>.*?</\1\s*>#is', '', $html);
        $html = preg_replace('#<(script|style|iframe|object|embed|form|input|button|textarea|select|meta|link)\b[^>]*/?>#is', '', $html);
        $html = strip_tags(
            $html,
            '<p><br><strong><b><em><i><u><s><h1><h2><h3><h4><h5><h6><ul><ol><li><blockquote><pre><code><a><span><div><table><thead><tbody><tr><th><td><hr>'
        );
        $html = preg_replace('/\s+on[a-z0-9_-]+\s*=\s*(["\']).*?\1/isu', '', $html);
        $html = preg_replace('/\s+on[a-z0-9_-]+\s*=\s*[^\s>]+/isu', '', $html);
        $html = preg_replace('/\s+(style|srcdoc)\s*=\s*(["\']).*?\2/isu', '', $html);
        $html = preg_replace_callback(
            '/\s+(href|src)\s*=\s*(["\'])(.*?)\2/isu',
            function ($matches) {
                $attribute = strtolower($matches[1]);
                $url = trim(html_entity_decode($matches[3], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
                $isProtocolRelative = strpos($url, '//') === 0;
                $isRelative = strpos($url, '/') === 0 && strpos($url, '//') !== 0;
                $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));
                $allowedSchemes = $attribute === 'href'
                    ? ['', 'http', 'https', 'mailto', 'tel']
                    : ['', 'https'];

                if ($isProtocolRelative || (!$isRelative && !in_array($scheme, $allowedSchemes, true))) {
                    return '';
                }

                return ' ' . $attribute . '=' . $matches[2]
                    . htmlspecialchars($url, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
                    . $matches[2];
            },
            $html
        );
        $html = preg_replace_callback(
            '/\s+(href|src)\s*=\s*([^\s>"\']+)/isu',
            function ($matches) {
                $attribute = strtolower($matches[1]);
                $url = trim(html_entity_decode($matches[2], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
                $isProtocolRelative = strpos($url, '//') === 0;
                $isRelative = strpos($url, '/') === 0 && strpos($url, '//') !== 0;
                $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));
                $allowedSchemes = $attribute === 'href'
                    ? ['', 'http', 'https', 'mailto', 'tel']
                    : ['', 'https'];

                if ($isProtocolRelative || (!$isRelative && !in_array($scheme, $allowedSchemes, true))) {
                    return '';
                }

                return ' ' . $attribute . '="'
                    . htmlspecialchars($url, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
                    . '"';
            },
            $html
        );
        $html = preg_replace('/\s+(style|srcdoc)\s*=\s*[^\s>]+/isu', '', $html);

        return trim($html);
    }

    function api_safe_url($value, $allowRelative = true, $maxLength = 500)
    {
        $url = api_plain_text($value, $maxLength, false);
        if ($url === '') {
            return '';
        }

        if (
            $allowRelative
            && strpos($url, '//') !== 0
            && preg_match('#^/[A-Za-z0-9/_\-.%]+$#', $url)
        ) {
            return $url;
        }

        if (filter_var($url, FILTER_VALIDATE_URL) !== false && strtolower((string) parse_url($url, PHP_URL_SCHEME)) === 'https') {
            return $url;
        }

        api_json_response(['error' => 'Invalid URL'], 422);
    }

    function api_positive_id($value)
    {
        $id = filter_var($value, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        if ($id === false) {
            api_json_response(['error' => 'Invalid ID'], 400);
        }
        return (int) $id;
    }

    function api_client_ip()
    {
        $ip = isset($_SERVER['REMOTE_ADDR']) ? trim((string) $_SERVER['REMOTE_ADDR']) : '';
        return filter_var($ip, FILTER_VALIDATE_IP) !== false ? $ip : '';
    }

    function api_sanitize_rows($rows, $htmlFields = [])
    {
        foreach ($rows as &$row) {
            foreach ($row as $key => $value) {
                if (in_array($key, $htmlFields, true)) {
                    $row[$key] = api_sanitize_html($value);
                } elseif (is_string($value)) {
                    $row[$key] = trim(strip_tags(
                        preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value)
                    ));
                }
            }
        }
        unset($row);
        return $rows;
    }
}

api_apply_security_headers();
