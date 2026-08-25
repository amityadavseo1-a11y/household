const fs = require('fs');

const services = [
    { file: 'house-shifting.html', prefix: 'house-shifting', name: 'House Shifting' },
    { file: 'office-relocation.html', prefix: 'office-relocation', name: 'Office Relocation' },
    { file: 'car-transportation.html', prefix: 'car-transportation', name: 'Car Transportation' },
    { file: 'bike-transportation.html', prefix: 'bike-transportation', name: 'Bike Transportation' },
    { file: 'furniture-shifting.html', prefix: 'furniture-shifting', name: 'Furniture Shifting' }
];

// Get list of cities from the packers-and-movers-*.html files
const files = fs.readdirSync('.');
const cities = [];

for (const f of files) {
    if (f.startsWith('packers-and-movers-') && f.endsWith('.html') && f !== 'packers-and-movers.html') {
        const cityId = f.replace('packers-and-movers-', '').replace('.html', '');
        
        // Convert cityId (e.g. "andhra-pradesh") to Title Case ("Andhra Pradesh")
        const cityName = cityId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        cities.push({ id: cityId, name: cityName });
    }
}

console.log(`Found ${cities.length} cities.`);

let generatedCount = 0;

for (const service of services) {
    const template = fs.readFileSync(service.file, 'utf8');

    for (const city of cities) {
        let content = template;

        // 1. Replace Title
        content = content.replace(/<title>.*?<\/title>/, `<title>Top ${service.name} in ${city.name} - 100% Verified | Household Packers</title>`);

        // 2. Replace Description
        content = content.replace(/name="description"\s+content="[^"]*"/, `name="description" content="Hire the best ${service.name} in ${city.name}. Compare verified and affordable moving services in ${city.name} NCR for home shifting, office relocation, and car transport. Get free quotes today!"`);

        // 3. Replace H1
        content = content.replace(/<h1[^>]*>.*?<\/h1>/s, `<h1>Top ${service.name} service in ${city.name} , <br>Compare & <br><span>Save upto 25%*</span></h1>`);

        // 4. Protect specific strings that contain "India" but shouldn't be changed
        content = content.replace(/Cities We Cover in India/g, '@@CITIES_WE_COVER@@');
        content = content.replace(/India's Trusted/g, '@@INDIA_TRUSTED@@');
        content = content.replace(/All over India/g, '@@ALL_OVER_INDIA@@'); // if any
        content = content.replace(/Major Indian routes/ig, '@@MAJOR_INDIAN@@');

        // 5. Replace generic locations with the city name
        content = content.replace(/in India/g, `in ${city.name}`);
        content = content.replace(/across India/gi, `in ${city.name}`);
        content = content.replace(/from India/gi, `from ${city.name}`);
        
        // Also just "India" standalone in headings
        content = content.replace(/>([^<]*)India([^>]*)<\//g, (match, p1, p2) => {
            return `>${p1}${city.name}${p2}</`;
        });

        // 6. Restore protected strings
        content = content.replace(/@@CITIES_WE_COVER@@/g, 'Cities We Cover in India');
        content = content.replace(/@@INDIA_TRUSTED@@/g, "India's Trusted");
        content = content.replace(/@@ALL_OVER_INDIA@@/g, 'All over India');
        content = content.replace(/@@MAJOR_INDIAN@@/g, 'major Indian routes');

        // 7. Save the new city-specific service page
        const newFileName = `${service.prefix}-${city.id}.html`;
        fs.writeFileSync(newFileName, content, 'utf8');
        generatedCount++;
    }
}

console.log(`Generated ${generatedCount} city-specific service pages.`);
