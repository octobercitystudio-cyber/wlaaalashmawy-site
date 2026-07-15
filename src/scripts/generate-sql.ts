import fs from 'fs';
import { sectorsData } from '../data/sectors';
import { servicesData } from '../data/services';

function escapeSql(str: string) {
    if (!str) return '';
    return str.replace(/'/g, "\\'");
}

let sql = `
CREATE TABLE IF NOT EXISTS sectors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS features (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    content TEXT,
    rating INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Truncate existing data to avoid duplicates during migration
TRUNCATE TABLE sectors;
TRUNCATE TABLE services;
TRUNCATE TABLE features;
TRUNCATE TABLE stats;
TRUNCATE TABLE testimonials;
`;

sectorsData.forEach(sector => {
    sql += `INSERT INTO sectors (title, description, image, content) VALUES ('${escapeSql(sector.title.ar)}', '${escapeSql(sector.shortDesc.ar)}', '${escapeSql(sector.image)}', '');\n`;
});

servicesData.forEach(service => {
    sql += `INSERT INTO services (title, description, image, content) VALUES ('${escapeSql(service.title.ar)}', '${escapeSql(service.shortDesc.ar)}', '${escapeSql(service.image)}', '${escapeSql(service.content.ar)}');\n`;
});

const featuresData = [
  {
    title: "الخبرة الواسعة",
    description: "فريق من الخبراء المتخصصين في مختلف المجالات المالية والضريبية",
    icon: "BadgeCheck"
  },
  {
    title: "الدقة والموثوقية",
    description: "نلتزم بأعلى معايير الجودة والدقة في جميع خدماتنا",
    icon: "Target"
  },
  {
    title: "حلول متكاملة",
    description: "نقدم باقة شاملة من الخدمات التي تلبي كافة احتياجات عملائنا",
    icon: "Layers"
  },
  {
    title: "الالتزام بالوقت",
    description: "نقدر وقت عملائنا ونلتزم بتقديم خدماتنا في الوقت المحدد",
    icon: "Clock"
  }
];

featuresData.forEach(feature => {
    sql += `INSERT INTO features (title, description, icon) VALUES ('${escapeSql(feature.title)}', '${escapeSql(feature.description)}', '${escapeSql(feature.icon)}');\n`;
});

const statsData = [
  { title: "سنوات الخبرة", value: "+15" },
  { title: "عميل سعيد", value: "+500" },
  { title: "مشروع ناجح", value: "+1000" },
  { title: "خبير مالي", value: "+50" }
];

statsData.forEach(stat => {
    sql += `INSERT INTO stats (title, value) VALUES ('${escapeSql(stat.title)}', '${escapeSql(stat.value)}');\n`;
});

const testimonialsData = [
  { name: "أحمد محمود", position: "المدير التنفيذي لشركة الأفق", content: "خدمات احترافية وفريق عمل متميز، ساعدونا كثيراً في تحسين الكفاءة المالية لشركتنا.", rating: 5 },
  { name: "محمد علي", position: "رئيس مجلس إدارة مجموعة النور", content: "استشاراتهم الضريبية وفرت علينا الكثير من الوقت والجهد، شكراً لكم.", rating: 5 },
  { name: "سارة حسن", position: "مديرة الحسابات في شركة القمة", content: "دقة في المواعيد واحترافية في التعامل، نعتمد عليهم في كافة أعمالنا المالية.", rating: 5 }
];

testimonialsData.forEach(testi => {
    sql += `INSERT INTO testimonials (name, position, content, rating) VALUES ('${escapeSql(testi.name)}', '${escapeSql(testi.position)}', '${escapeSql(testi.content)}', ${testi.rating});\n`;
});

fs.writeFileSync('public/api/migration.sql', sql);
console.log('Migration SQL generated successfully at public/api/migration.sql');
