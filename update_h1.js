const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');

let updatedCount = 0;

for (const file of files) {
    if (file.startsWith('packers-and-movers-') && file.endsWith('.html')) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Find the specific h1 tag pattern
        const regex = /<h1>Top Packers and Movers\s*<br>\s*in\s+([^,]+),\s*Compare &\s*<br>\s*<span>Save upto 25%\*<\/span><\/h1>/i;
        
        const match = content.match(regex);
        
        if (match) {
            const cityName = match[1];
            // Replace with the new format
            const newH1 = `<h1>Top Packers and Movers service in ${cityName} , <br>Compare & <br><span>Save upto 25%*</span></h1>`;
            
            content = content.replace(regex, newH1);
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
        }
    }
}

console.log(`Updated ${updatedCount} files.`);
