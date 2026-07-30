<?php

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';

header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
api_handle_options('GET, OPTIONS');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET, OPTIONS');
    api_json_response(['error' => 'Method not allowed'], 405);
}

api_require_auth($pdo);

try {
    $stats = [];

    $stats['total_visits'] = (int) $pdo
        ->query('SELECT COUNT(*) FROM visits')
        ->fetchColumn();

    $stats['unique_visitors'] = (int) $pdo
        ->query('SELECT COUNT(DISTINCT visitor_id) FROM visits')
        ->fetchColumn();

    $stats['visits_today'] = (int) $pdo
        ->query('SELECT COUNT(*) FROM visits WHERE DATE(visited_at) = UTC_DATE()')
        ->fetchColumn();

    $stmt = $pdo->query(
        'SELECT DATE(visited_at) AS date, COUNT(*) AS count
         FROM visits
         WHERE visited_at >= DATE_SUB(UTC_DATE(), INTERVAL 30 DAY)
         GROUP BY DATE(visited_at)
         ORDER BY date ASC'
    );
    $stats['chart_data'] = array_map(function ($row) {
        return [
            'date' => (string) $row['date'],
            'count' => (int) $row['count']
        ];
    }, $stmt->fetchAll());

    $stmt = $pdo->query(
        'SELECT page_path,
                COUNT(*) AS total_views,
                COUNT(DISTINCT visitor_id) AS unique_views
         FROM visits
         GROUP BY page_path
         ORDER BY total_views DESC
         LIMIT 100'
    );
    $stats['page_stats'] = array_map(function ($row) {
        return [
            'page_path' => (string) $row['page_path'],
            'total_views' => (int) $row['total_views'],
            'unique_views' => (int) $row['unique_views']
        ];
    }, $stmt->fetchAll());

    $stats['articles_count'] = (int) $pdo
        ->query('SELECT COUNT(*) FROM articles')
        ->fetchColumn();
    $stats['services_count'] = (int) $pdo
        ->query('SELECT COUNT(*) FROM services')
        ->fetchColumn();

    api_json_response($stats);
} catch (Throwable $e) {
    error_log('Analytics query failed: ' . $e->getMessage());
    api_json_response(['error' => 'Unable to load analytics'], 500);
}
