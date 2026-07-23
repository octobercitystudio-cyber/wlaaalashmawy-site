const fs = require('fs');

const aboutContent = fs.readFileSync('./src/components/pages/AboutPage.tsx', 'utf8');
const contactContent = fs.readFileSync('./src/components/pages/ContactPage.tsx', 'utf8');

// A function to extract the string from the dangerouslySetInnerHTML ternary:
// Example: (lang === "en" ? "ENGLISH" : "ARABIC")
function extractText(str, regex) {
  const match = str.match(regex);
  if (match) return match;
  return [null, '', ''];
}

const aboutFullMatch = extractText(aboutContent, /about_full\)[^\?]*\?\s*`([^`]*)`\s*:\s*`([^`]*)`/);
const visionMatch = extractText(aboutContent, /vision\)[^\?]*\?\s*"([^"]*)"\s*:\s*"([^"]*)"/);
const missionMatch = extractText(aboutContent, /mission\)[^\?]*\?\s*"([^"]*)"\s*:\s*"([^"]*)"/);

const addressMatch = extractText(contactContent, /contact_address\)[^\?]*\?\s*"([^"]*)"\s*:\s*"([^"]*)"/);

// Default social links
const socials = {
    social_facebook: 'https://facebook.com',
    social_instagram: 'https://instagram.com',
    social_youtube: 'https://youtube.com',
    social_linkedin: 'https://linkedin.com',
    social_tiktok: 'https://tiktok.com'
};

const settingsToSeed = {
    about_full_en: aboutFullMatch[1],
    about_full: aboutFullMatch[2],
    vision_en: visionMatch[1],
    vision: visionMatch[2],
    mission_en: missionMatch[1],
    mission: missionMatch[2],
    contact_address_en: addressMatch[1],
    contact_address: addressMatch[2],
    contact_emails: JSON.stringify(['info@afc-cpa.com']),
    contact_phones: JSON.stringify(['01155729429', '0238345397']),
    contact_map: 'https://maps.google.com/maps?q=29.9607581,30.9246025&hl=ar&z=16&output=embed',
    ...socials
};

let phpSettingsCode = `
    // Settings
    $settingsToSeed = [
`;
for (const [key, value] of Object.entries(settingsToSeed)) {
    if (value) {
        phpSettingsCode += `        '${key}' => ${JSON.stringify(value)},\n`;
    }
}
phpSettingsCode += `    ];

    $stmt = $pdo->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = setting_value");
    foreach ($settingsToSeed as $k => $v) {
        $stmt->execute([$k, $v]);
    }
`;

// Insert it into seed.php before $pdo->commit();
let seedContent = fs.readFileSync('./public/api/seed.php', 'utf8');
seedContent = seedContent.replace('$pdo->commit();', phpSettingsCode + '\n    $pdo->commit();');

fs.writeFileSync('./public/api/seed.php', seedContent);
console.log('Successfully updated seed.php with Settings!');
