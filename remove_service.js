const fs = require('fs');
const path = require('path');

const dirPath = '.';
let count = 0;

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                walk(file);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(file, 'utf8');
            
            // Replace " Service" or " Services" or " service" or " services" inside <h1>...</h1>
            let newContent = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (match, h1Content) => {
                // Remove the word service(s) from h1 content
                let updatedContent = h1Content.replace(/\s+services?/gi, '');
                return match.replace(h1Content, updatedContent);
            });
            
            if (content !== newContent) {
                fs.writeFileSync(file, newContent, 'utf8');
                count++;
            }
        }
    });
}

walk(dirPath);
console.log(`Modified ${count} files`);
