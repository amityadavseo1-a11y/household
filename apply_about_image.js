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
            
            // Regex to find the image tag immediately following <div class="about-image-container">
            // and replace its src with images/about_movers.jpg
            const regex = /(<div class="about-image-container">\s*<img src=")[^"]+(" alt="Household Packers">)/gi;
            
            let newContent = content.replace(regex, '$1images/about_movers.jpg$2');
            
            if (content !== newContent) {
                fs.writeFileSync(file, newContent, 'utf8');
                count++;
            }
        }
    });
}

walk(dirPath);
console.log(`Modified ${count} files`);
