const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const routesMatch = indexHtml.match(/<!-- Popular Routes Section -->[\s\S]*?<\/section>/);

if (routesMatch) {
    const routesSection = routesMatch[0];
    const files = [
        'house-shifting.html',
        'office-relocation.html',
        'car-transportation.html',
        'bike-transportation.html',
        'furniture-shifting.html',
        'packers-and-movers.html'
    ];

    let updatedCount = 0;
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/<!-- Popular Routes Section -->[\s\S]*?<\/section>/, routesSection);
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }

    console.log(`Updated ${updatedCount} files with the routes section.`);
} else {
    console.log("Could not find routes section in index.html");
}
