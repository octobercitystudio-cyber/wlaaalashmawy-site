<?php
require_once __DIR__ . '/db.php';
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$method = $_SERVER['REQUEST_METHOD'];

function checkAuth() {
    $headers = apache_request_headers();
    $auth = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    if (strpos($auth, 'Bearer') === false) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
}

if ($method == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($method == 'POST') {
    checkAuth();
    
    $gh_pat = '';
    $gh_repo = 'Kimo0O/Wlaa_Alshmawy';
    
    if (file_exists(__DIR__ . '/config.php')) {
        require_once __DIR__ . '/config.php';
    }
    
    if (!empty($gh_pat) && !empty($gh_repo)) {
        
        $ch = curl_init("https://api.github.com/repos/$gh_repo/actions/workflows/deploy.yml/dispatches");
        
        $payload = json_encode(['ref' => 'main']);
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Accept: application/vnd.github+json",
            "Authorization: Bearer $gh_pat",
            "User-Agent: Hostinger-PHP-Deployer"
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        
        $response = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpcode >= 200 && $httpcode < 300) {
            echo json_encode(['success' => true, 'message' => 'تم إرسال أمر التحديث بنجاح. قد يستغرق دقيقتين للظهور.']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'فشل الاتصال بجيت هب', 'details' => $response]);
        }
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'إعدادات النشر غير متوفرة. الرجاء إنشاء ملف config.php وإضافة GH_PAT']);
    }
}
?>
