const fs = require('fs');

const pages = [
    { file: 'house-shifting.html', prefix: 'house-shifting' },
    { file: 'office-relocation.html', prefix: 'office-relocation' },
    { file: 'car-transportation.html', prefix: 'car-transportation' },
    { file: 'bike-transportation.html', prefix: 'bike-transportation' },
    { file: 'furniture-shifting.html', prefix: 'furniture-shifting' }
];

let updatedCount = 0;

for (const page of pages) {
    if (fs.existsSync(page.file)) {
        let content = fs.readFileSync(page.file, 'utf8');
        
        // Find the Cities We Cover section
        const citiesSectionRegex = /(<!-- Cities We Cover Section -->[\s\S]*?<\/section>)/;
        const match = content.match(citiesSectionRegex);
        
        if (match) {
            let citiesSection = match[0];
            
            // Replace the href links
            // It currently looks like: href="packers-and-movers-delhi.html"
            // We want: href="house-shifting-delhi.html"
            citiesSection = citiesSection.replace(/href="packers-and-movers-([^"]+)\.html"/g, `href="${page.prefix}-$1.html"`);
            
            content = content.replace(citiesSectionRegex, citiesSection);
            fs.writeFileSync(page.file, content, 'utf8');
            updatedCount++;
            console.log(`Updated links in ${page.file} to use prefix ${page.prefix}`);
        }
    }
}

console.log(`Done. Updated links in ${updatedCount} files.`);
