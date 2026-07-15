<?php
require_once __DIR__ . '/db.php';
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$headers = apache_request_headers();
$auth = isset($headers['Authorization']) ? $headers['Authorization'] : '';
if (strpos($auth, 'Bearer') === false) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        $stats = [];
        
        // Total visits
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM visits");
        $stats['total_visits'] = $stmt->fetch()['total'];
        
        // Unique visitors
        $stmt = $pdo->query("SELECT COUNT(DISTINCT visitor_id) as total FROM visits");
        $stats['unique_visitors'] = $stmt->fetch()['total'];
        
        // Visits today
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM visits WHERE DATE(visited_at) = CURDATE()");
        $stats['visits_today'] = $stmt->fetch()['total'];

        // Last 7 days chart data
        $stmt = $pdo->query("
            SELECT DATE(visited_at) as date, COUNT(*) as count 
            FROM visits 
            WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
            GROUP BY DATE(visited_at)
            ORDER BY date ASC
        ");
        $stats['chart_data'] = $stmt->fetchAll();
        
        // Top 5 pages
        $stmt = $pdo->query("
            SELECT page_path, COUNT(*) as count 
            FROM visits 
            GROUP BY page_path 
            ORDER BY count DESC 
            LIMIT 5
        ");
        $stats['top_pages'] = $stmt->fetchAll();

        // Also return counts of content for the dashboard
        $stats['articles_count'] = $pdo->query("SELECT COUNT(*) as total FROM articles")->fetch()['total'];
        $stats['services_count'] = $pdo->query("SELECT COUNT(*) as total FROM services")->fetch()['total'];
        
        echo json_encode($stats);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
