const fs = require('fs');

const mainPages = [
    'index.html',
    'house-shifting.html',
    'office-relocation.html',
    'car-transportation.html',
    'bike-transportation.html',
    'furniture-shifting.html',
    'packers-and-movers.html'
];

const files = fs.readdirSync('.');
let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('.html') && !mainPages.includes(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Match the Cities We Cover Section
        const regex = /<!-- Cities We Cover Section -->[\s\S]*?<\/section>/i;
        if (regex.test(content)) {
            content = content.replace(regex, '');
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
        }
    }
}

console.log(`Removed Cities We Cover section from ${updatedCount} location pages.`);
