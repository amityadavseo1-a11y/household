const fs = require('fs');
const path = require('path');

const dirPath = '.';
const patternAlt = /(<img[^>]*?alt=)(['"])(.*?)\2/gi;
const patternImg = /<img[^>]+>/gi;

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
            let newContent = content.replace(patternImg, (imgTag) => {
                // If it already has an alt tag, replace its value
                if (/alt=['"]/i.test(imgTag)) {
                    return imgTag.replace(/(alt=)(['"])(.*?)\2/i, `$1$2Household Packers$2`);
                } else {
                    // If it doesn't have an alt tag, add it before the closing bracket
                    if (imgTag.endsWith('/>')) {
                        return imgTag.slice(0, -2) + ' alt="Household Packers" />';
                    } else {
                        return imgTag.slice(0, -1) + ' alt="Household Packers">';
                    }
                }
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
