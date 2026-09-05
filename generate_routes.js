const fs = require('fs');
const path = require('path');

const routes = [
    { from: 'Delhi', to: 'Bangalore' },
    { from: 'Mumbai', to: 'Pune' },
    { from: 'Bangalore', to: 'Hyderabad' },
    { from: 'Delhi', to: 'Mumbai' },
    { from: 'Hyderabad', to: 'Chennai' },
    { from: 'Pune', to: 'Bangalore' },
    { from: 'Kolkata', to: 'Delhi' },
    { from: 'Ahmedabad', to: 'Mumbai' },
    { from: 'Noida', to: 'Pune' },
    { from: 'Gurgaon', to: 'Bangalore' },
    { from: 'Chennai', to: 'Coimbatore' },
    { from: 'Jaipur', to: 'Delhi' }
];

const templatePath = path.join(__dirname, 'packers-and-movers-delhi.html');
const templateContent = fs.readFileSync(templatePath, 'utf-8');

routes.forEach(route => {
    const filename = `packers-and-movers-${route.from.toLowerCase()}-to-${route.to.toLowerCase()}.html`;
    const filePath = path.join(__dirname, filename);
    
    let content = templateContent;
    
    // Title, Meta
    content = content.replace(/in Delhi/g, `from ${route.from} to ${route.to}`);
    content = content.replace(/Delhi NCR/g, `${route.from} to ${route.to}`);
    content = content.replace(/packers and movers delhi/g, `packers and movers ${route.from.toLowerCase()} to ${route.to.toLowerCase()}`);
    content = content.replace(/packers and movers in delhi/g, `packers and movers from ${route.from.toLowerCase()} to ${route.to.toLowerCase()}`);
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
    
    // Remove Popular Routes Section
    content = content.replace(/<!-- Popular Routes Section -->[\s\S]*?<\/section>/g, '');
    
    // Fix some over-replacements
    content = content.replace(new RegExp(`from ${route.from} to ${route.to} to ${route.to}`, 'g'), `from ${route.from} to ${route.to}`);

    fs.writeFileSync(filePath, content);
    console.log(`Created ${filename}`);
});

console.log("Finished generating pages.");
