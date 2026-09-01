const fs = require('fs');
const path = require('path');

const dirPath = '.';
let count = 0;

// The string we want to search for and replace across files.
// It's the styled captcha-box that has "width: 100%; max-width: 300px; margin-bottom: 15px;"
const searchStr = `<div class="captcha-box" style="display: flex; align-items: center; justify-content: space-between; background: #f9f9f9; border: 1px solid #d3d3d3; border-radius: 3px; padding: 10px 15px; width: 100%; max-width: 300px; margin-bottom: 15px; box-shadow: 0 0 4px 1px rgba(0,0,0,0.08);">`;

// The new string to replace it with
const replacementStr = `<div class="captcha-box" style="display: flex; align-items: center; justify-content: space-between; background: #f9f9f9; border: 1px solid #d3d3d3; border-radius: 3px; padding: 8px 10px; width: auto; max-width: 220px; margin-bottom: 0; box-shadow: 0 0 4px 1px rgba(0,0,0,0.08); flex-shrink: 0;">`;

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
            
            if (content.includes(searchStr)) {
                let newContent = content.replace(searchStr, replacementStr);
                fs.writeFileSync(file, newContent, 'utf8');
                count++;
            }
        }
    });
}

walk(dirPath);
console.log(`Modified ${count} files`);
