<?php
require_once __DIR__ . '/db.php';

// A simple secret key to prevent unauthorized access
$secret = isset($_GET['secret']) ? $_GET['secret'] : '';
if ($secret !== 'ashmawy_migrate_2026') {
    http_response_code(403);
    echo "Forbidden";
    exit;
}

$sql_file = __DIR__ . '/migration.sql';

if (!file_exists($sql_file)) {
    echo "migration.sql not found!";
    exit;
}

$sql = file_get_contents($sql_file);

try {
    // Execute the SQL queries
    $pdo->exec($sql);
    echo "<h1>Migration completed successfully!</h1>";
    echo "<p>The tables have been created and the initial data has been inserted.</p>";
} catch (PDOException $e) {
    echo "<h1>Migration failed!</h1>";
    echo "<p>Error: " . $e->getMessage() . "</p>";
}
?>
