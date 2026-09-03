const fs = require('fs');

const files = fs.readdirSync('.');
let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        content = content.replace(/<li><a href="#">JOIN AS VENDOR<\/a><\/li>/g, '<li><a href="join-as-vendor.html">JOIN AS VENDOR</a></li>');

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
        }
    }
}

console.log(`Updated navbar JOIN AS VENDOR link in ${updatedCount} HTML files.`);
