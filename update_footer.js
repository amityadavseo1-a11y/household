const fs = require('fs');
const path = require('path');

const newFooter = fs.readFileSync('footer_snippet.html', 'utf8');
const files = fs.readdirSync('.');

let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'footer_snippet.html') {
        let content = fs.readFileSync(file, 'utf8');
        
        // Find the footer in the target file
        const footerRegex = /<footer[\s\S]*?<\/footer>/;
        
        if (footerRegex.test(content)) {
            content = content.replace(footerRegex, newFooter);
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
        }
    }
}

console.log(`Updated footer in ${updatedCount} HTML files.`);
