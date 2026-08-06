<?php
require_once __DIR__ . '/security.php';

// A local ignored config takes precedence during development. Production uses
// config.php generated at deployment time.
$configFile = file_exists(__DIR__ . '/config.local.php')
    ? __DIR__ . '/config.local.php'
    : __DIR__ . '/config.php';
if (file_exists($configFile)) {
    require_once $configFile;
}

$db_host = isset($db_host) ? $db_host : (getenv('DB_HOST') ?: 'localhost');
$db_user = isset($db_user) ? $db_user : (getenv('DB_USER') ?: '');
$db_pass = isset($db_pass) ? $db_pass : (getenv('DB_PASS') ?: '');
$db_name = isset($db_name) ? $db_name : (getenv('DB_NAME') ?: '');

if ($db_user === '' || $db_name === '') {
    api_json_response(['error' => 'Database is not configured'], 503);
}

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Auto-create tables if they don't exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS articles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            title_en VARCHAR(255) DEFAULT '',
            date VARCHAR(50) NOT NULL,
            category VARCHAR(100) NOT NULL,
            category_en VARCHAR(100) DEFAULT '',
            image VARCHAR(255) DEFAULT '',
            video_url VARCHAR(500) DEFAULT '',
            content TEXT NOT NULL,
            content_en TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS services (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            title_en VARCHAR(255) DEFAULT '',
            image VARCHAR(255) DEFAULT '',
            description TEXT NOT NULL,
            description_en TEXT,
            content TEXT NOT NULL,
            content_en TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS sectors (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            title_en VARCHAR(255) DEFAULT '',
            image VARCHAR(255) DEFAULT '',
            description TEXT NOT NULL,
            description_en TEXT,
            content TEXT NOT NULL,
            content_en TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS settings (
            setting_key VARCHAR(100) PRIMARY KEY,
            setting_value TEXT NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS features (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            title_en VARCHAR(255) DEFAULT '',
            description TEXT NOT NULL,
            description_en TEXT,
            icon VARCHAR(100) DEFAULT 'Target',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS stats (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            title_en VARCHAR(255) DEFAULT '',
            value VARCHAR(100) NOT NULL,
            value_en VARCHAR(100) DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS testimonials (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            name_en VARCHAR(255) DEFAULT '',
            position VARCHAR(255) DEFAULT '',
            position_en VARCHAR(255) DEFAULT '',
            content TEXT NOT NULL,
            content_en TEXT,
            image VARCHAR(500) DEFAULT '',
            rating INT DEFAULT 5,
            is_verified TINYINT(1) NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS visits (
            id INT AUTO_INCREMENT PRIMARY KEY,
            page_path VARCHAR(255) NOT NULL,
            visitor_id VARCHAR(100) NOT NULL,
            ip_address VARCHAR(45) DEFAULT '',
            visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS admin_sessions (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            token_hash CHAR(64) NOT NULL UNIQUE,
            username VARCHAR(100) NOT NULL,
            ip_address VARCHAR(45) DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_used_at TIMESTAMP NULL DEFAULT NULL,
            expires_at DATETIME NOT NULL,
            INDEX idx_admin_sessions_expiry (expires_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS login_attempts (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            ip_address VARCHAR(45) NOT NULL,
            successful TINYINT(1) NOT NULL DEFAULT 0,
            attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_login_attempts_ip_time (ip_address, attempted_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS password_reset_codes (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(254) NOT NULL,
            code_hash VARCHAR(255) NOT NULL,
            ip_address VARCHAR(45) DEFAULT '',
            attempts TINYINT UNSIGNED NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME NOT NULL,
            used_at DATETIME DEFAULT NULL,
            INDEX idx_password_reset_email_expiry (email, expires_at),
            INDEX idx_password_reset_ip_time (ip_address, created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

        CREATE TABLE IF NOT EXISTS contact_rate_limits (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            ip_hash CHAR(64) NOT NULL,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_contact_rate_ip_time (ip_hash, submitted_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // Safely add ip_address column if it doesn't exist
    try { $pdo->exec("ALTER TABLE visits ADD COLUMN ip_address VARCHAR(45) DEFAULT ''"); } catch (PDOException $e) {}
    
    // Safely add english columns if they don't exist
    $safeColumns = [
        "ALTER TABLE features ADD COLUMN title_en VARCHAR(255) DEFAULT ''",
        "ALTER TABLE features ADD COLUMN description_en TEXT",
        "ALTER TABLE stats ADD COLUMN title_en VARCHAR(255) DEFAULT ''",
        "ALTER TABLE stats ADD COLUMN value_en VARCHAR(100) DEFAULT ''",
        "ALTER TABLE testimonials ADD COLUMN name_en VARCHAR(255) DEFAULT ''",
        "ALTER TABLE testimonials ADD COLUMN position_en VARCHAR(255) DEFAULT ''",
        "ALTER TABLE testimonials ADD COLUMN content_en TEXT",
        "ALTER TABLE testimonials ADD COLUMN image VARCHAR(500) DEFAULT ''",
        "ALTER TABLE testimonials ADD COLUMN is_verified TINYINT(1) NOT NULL DEFAULT 0",
        "ALTER TABLE articles ADD COLUMN title_en VARCHAR(255) DEFAULT ''",
        "ALTER TABLE articles ADD COLUMN category_en VARCHAR(100) DEFAULT ''",
        "ALTER TABLE articles ADD COLUMN content_en TEXT",
        "ALTER TABLE articles ADD COLUMN video_url VARCHAR(500) DEFAULT ''",
        "ALTER TABLE services ADD COLUMN title_en VARCHAR(255) DEFAULT ''",
        "ALTER TABLE services ADD COLUMN description_en TEXT",
        "ALTER TABLE services ADD COLUMN content_en TEXT",
        "ALTER TABLE sectors ADD COLUMN title_en VARCHAR(255) DEFAULT ''",
        "ALTER TABLE sectors ADD COLUMN description_en TEXT",
        "ALTER TABLE sectors ADD COLUMN content_en TEXT"
    ];
    foreach ($safeColumns as $alterStatement) {
        try {
            $pdo->exec($alterStatement);
        } catch (PDOException $e) {
            // The column already exists.
        }
    }

    // Import the content that previously lived only in the static frontend.
    // The title/name checks keep this migration safe and idempotent.
    $cmsSeedFile = dirname(__DIR__) . '/content/cms-seed.json';
    $cmsSeedVersion = $pdo->query("SELECT setting_value FROM settings WHERE setting_key = 'cms_seed_version' LIMIT 1")->fetchColumn();
    if ($cmsSeedVersion !== '3' && is_file($cmsSeedFile)) {
        $cmsSeed = json_decode((string) file_get_contents($cmsSeedFile), true);
        if (is_array($cmsSeed)) {
            $insertSetting = $pdo->prepare(
                'INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (?, ?)'
            );
            foreach (($cmsSeed['settings'] ?? []) as $settingKey => $settingValue) {
                if (!is_string($settingKey) || !preg_match('/^[a-z][a-z0-9_]{0,99}$/', $settingKey)) continue;
                $insertSetting->execute([$settingKey, (string) $settingValue]);
            }
            $overwriteSetting = $pdo->prepare(
                'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)'
            );
            foreach (($cmsSeed['overwriteSettings'] ?? []) as $settingKey => $settingValue) {
                if (!is_string($settingKey) || !preg_match('/^[a-z][a-z0-9_]{0,99}$/', $settingKey)) continue;
                $overwriteSetting->execute([$settingKey, (string) $settingValue]);
            }
            $pdo->exec(
                "UPDATE settings SET setting_value = REPLACE(setting_value, 'شركة \"ولاء مجدي العشماوي للمحاسبة القانونية\" (AFC)', 'AFC – العشماوي للاستشارات المالية') WHERE setting_key = 'about_full'"
            );
            $pdo->exec(
                "UPDATE settings SET setting_value = REPLACE(setting_value, '\"Wlaa Magdy Al-Ashmawy for Legal Accounting\" (AFC)', 'AFC – Al-Ashmawy Financial Consulting') WHERE setting_key = 'about_full_en'"
            );
            $pdo->exec(
                "UPDATE settings SET setting_value = REPLACE(setting_value, '\"Al-Ashmawy Office for Financial Advisory\" (AFC)', 'AFC – Al-Ashmawy Financial Consulting') WHERE setting_key = 'about_full_en'"
            );

            $articleExists = $pdo->prepare('SELECT id FROM articles WHERE TRIM(title) = TRIM(?) LIMIT 1');
            $updateSeedArticle = $pdo->prepare(
                'UPDATE articles
                 SET category = ?, category_en = ?,
                     title_en = CASE WHEN title_en IS NULL OR TRIM(title_en) = \'\' THEN ? ELSE title_en END,
                     content_en = CASE WHEN content_en IS NULL OR TRIM(content_en) = \'\' THEN ? ELSE content_en END
                 WHERE id = ?'
            );
            $insertArticle = $pdo->prepare(
                'INSERT INTO articles (title, title_en, date, category, category_en, image, video_url, content, content_en)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );
            foreach (($cmsSeed['articles'] ?? []) as $article) {
                if (!is_array($article) || empty($article['title']) || empty($article['content'])) continue;
                $articleExists->execute([(string) $article['title']]);
                $existingArticleId = (int) $articleExists->fetchColumn();
                if ($existingArticleId > 0) {
                    $updateSeedArticle->execute([
                        api_plain_text($article['category'] ?? '', 100, true),
                        api_plain_text($article['category_en'] ?? '', 100),
                        api_plain_text($article['title_en'] ?? '', 255),
                        api_sanitize_html($article['content_en'] ?? '', 1000000),
                        $existingArticleId,
                    ]);
                    continue;
                }
                $insertArticle->execute([
                    api_plain_text($article['title'], 255, true),
                    api_plain_text($article['title_en'] ?? '', 255),
                    api_plain_text($article['date'] ?? date('Y-m-d'), 50),
                    api_plain_text($article['category'] ?? '', 100, true),
                    api_plain_text($article['category_en'] ?? '', 100),
                    api_safe_url($article['image'] ?? '', true, 500),
                    api_safe_url($article['video_url'] ?? '', false, 500),
                    api_sanitize_html($article['content'], 1000000),
                    api_sanitize_html($article['content_en'] ?? '', 1000000),
                ]);
            }

            $testimonialExists = $pdo->prepare('SELECT id FROM testimonials WHERE name = ? LIMIT 1');
            $insertTestimonial = $pdo->prepare(
                'INSERT INTO testimonials (name, name_en, position, position_en, content, content_en, image, rating, is_verified)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)'
            );
            foreach (($cmsSeed['testimonials'] ?? []) as $testimonial) {
                if (!is_array($testimonial) || empty($testimonial['name']) || empty($testimonial['content'])) continue;
                $testimonialExists->execute([(string) $testimonial['name']]);
                if ($testimonialExists->fetchColumn()) continue;
                $insertTestimonial->execute([
                    api_plain_text($testimonial['name'], 255, true),
                    api_plain_text($testimonial['name_en'] ?? '', 255),
                    api_plain_text($testimonial['position'] ?? '', 255),
                    api_plain_text($testimonial['position_en'] ?? '', 255),
                    api_plain_text($testimonial['content'], 20000, true),
                    api_plain_text($testimonial['content_en'] ?? '', 20000),
                    api_safe_url($testimonial['image'] ?? '', true, 500),
                    max(1, min(5, (int) ($testimonial['rating'] ?? 5))),
                ]);
            }
            $seedMarker = $pdo->prepare(
                "INSERT INTO settings (setting_key, setting_value) VALUES ('cms_seed_version', '3')
                 ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)"
            );
            $seedMarker->execute();
        }
    }

    // Keep the session and throttling tables bounded.
    if (random_int(1, 100) === 1) {
        $pdo->exec("DELETE FROM admin_sessions WHERE expires_at <= UTC_TIMESTAMP()");
        $pdo->exec("DELETE FROM login_attempts WHERE attempted_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 DAY)");
        $pdo->exec("DELETE FROM password_reset_codes WHERE created_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 DAY)");
        $pdo->exec("DELETE FROM contact_rate_limits WHERE submitted_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 2 DAY)");
        $pdo->exec("DELETE FROM visits WHERE visited_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 180 DAY)");
    }

} catch (PDOException $e) {
    error_log('Database initialization failed: ' . $e->getMessage());
    api_json_response(['error' => 'Database service is unavailable'], 503);
}
?>
