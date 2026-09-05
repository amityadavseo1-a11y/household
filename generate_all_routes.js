const fs = require('fs');
const path = require('path');

const dirPath = __dirname;
const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.html'));

const uniqueRoutes = new Set();
const routeDetails = [];

// Regex to find route cards
const routeCardRegex = /<a href="[^"]*" class="route-card">\s*([A-Za-z\s]+?)\s*<span class="route-arrow">&#10140;<\/span>\s*([A-Za-z\s]+?)\s*<\/a>/g;

let updatedFilesCount = 0;

files.forEach(file => {
    // skip the generated routes themselves to avoid infinite generation loops or modifying generated files
    if (file.includes('-to-')) return;
    
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    let fileUpdated = false;
    
    content = content.replace(routeCardRegex, (match, fromCity, toCity) => {
        fromCity = fromCity.trim();
        toCity = toCity.trim();
        
        const routeId = `${fromCity.toLowerCase()}-to-${toCity.toLowerCase()}`;
        const routeFilename = `packers-and-movers-${routeId}.html`.replace(/\s+/g, '-');
        
        // Add to our list to generate
        const routeKey = `${fromCity}|${toCity}`;
        if (!uniqueRoutes.has(routeKey)) {
            uniqueRoutes.add(routeKey);
            routeDetails.push({ from: fromCity, to: toCity, filename: routeFilename });
        }
        
        fileUpdated = true;
        // Replace href
        return `<a href="${routeFilename}" class="route-card">${fromCity} <span class="route-arrow">&#10140;</span> ${toCity}</a>`;
    });
    
    if (fileUpdated) {
        fs.writeFileSync(filePath, content, 'utf-8');
        updatedFilesCount++;
    }
});

console.log(`Updated links in ${updatedFilesCount} files.`);
console.log(`Found ${routeDetails.length} unique routes to generate.`);

// Generate the pages for these routes
const templatePath = path.join(__dirname, 'packers-and-movers-delhi.html');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

// The original generate logic
let generatedCount = 0;
routeDetails.forEach(route => {
    const filePath = path.join(__dirname, route.filename);
    
    // Skip if file already exists
    if (fs.existsSync(filePath)) {
        return;
    }
    
    let content = templateContent;
    
    // Title, Meta
    content = content.replace(/in Delhi/g, `from ${route.from} to ${route.to}`);
    content = content.replace(/Delhi NCR/g, `${route.from} to ${route.to}`);
    content = content.replace(/packers and movers delhi/gi, `packers and movers ${route.from} to ${route.to}`);
    content = content.replace(/packers and movers in delhi/gi, `packers and movers from ${route.from} to ${route.to}`);
    content = content.replace(/local shifting in delhi/gi, `shifting from ${route.from} to ${route.to}`);
    
    // General text replacements
    content = content.replace(/Packers and Movers Delhi/g, `Packers and Movers from ${route.from} to ${route.to}`);
    content = content.replace(/Delhi location/g, `${route.from} location`);
    content = content.replace(/from South Delhi, Dwarka, Rohini, or planning an intercity relocation from Delhi/g, `from ${route.from} to ${route.to}`);
    content = content.replace(/within South Delhi, Dwarka, or Rohini/g, `from ${route.from} to ${route.to}`);
    content = content.replace(/offices in Connaught Place, Gurugram, and Noida/g, `offices from ${route.from} to ${route.to}`);
    content = content.replace(/from Delhi to anywhere in India/g, `from ${route.from} to ${route.to}`);
    content = content.replace(/from Delhi/g, `from ${route.from} to ${route.to}`);
    content = content.replace(/Delhi traffic police/gi, `${route.from} traffic police`);
    
    content = content.replace(/Local Shifting within Delhi/g, `Shifting from ${route.from} to ${route.to}`);
    content = content.replace(/Intercity Moves from Delhi/g, `Intercity Moves from ${route.from} to ${route.to}`);
    
    // Remove Popular Routes Section so it doesn't appear in the sub-pages
    content = content.replace(/<!-- Popular Routes Section -->[\s\S]*?<\/section>/g, '');
    
    // Fix some over-replacements
    content = content.replace(new RegExp(`from ${route.from} to ${route.to} to ${route.to}`, 'g'), `from ${route.from} to ${route.to}`);

    fs.writeFileSync(filePath, content);
    generatedCount++;
});

console.log(`Generated ${generatedCount} new route pages.`);
