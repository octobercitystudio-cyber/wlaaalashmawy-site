<?php
require_once 'public/api/config.php';
try {
    \ = new PDO(\"mysql:host=\;dbname=\;charset=utf8mb4\", \, \);
    \->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Add slug column
    try {
        \->exec(\"ALTER TABLE services ADD COLUMN slug VARCHAR(255) DEFAULT ''\");
        echo \"Added slug column to services.\\n\";
    } catch (Exception \) {
        echo \"Slug column might already exist.\\n\";
    }
    
    try {
        \->exec(\"ALTER TABLE articles ADD COLUMN slug VARCHAR(255) DEFAULT ''\");
        echo \"Added slug column to articles.\\n\";
    } catch (Exception \) {
        echo \"Slug column might already exist.\\n\";
    }

    // Seed slugs for services
    \ = [
        1 => 'accounting-services',
        2 => 'audit-services',
        3 => 'tax-services',
        4 => 'bookkeeping',
        5 => 'payroll',
        6 => 'company-formation',
        7 => 'financial-consulting',
        8 => 'ifrs',
        9 => 'vat-services',
        10 => 'e-invoice',
        11 => 'e-receipt',
        12 => 'internal-audit'
    ];
    
    foreach (\ as \ => \) {
        \ = \->prepare(\"UPDATE services SET slug = ? WHERE id = ?\");
        \->execute([\, \]);
    }
    echo \"Updated slugs.\\n\";
} catch (Exception \) {
    echo \"Error: \" . \->getMessage();
}
?>
