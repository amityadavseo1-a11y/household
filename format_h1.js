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
            
            // We want to match any h1 that looks like it's a hero h1 with the "Compare &" text
            let newContent = content.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (match, h1Content) => {
                
                // If it doesn't contain "Compare &", ignore it
                if (!h1Content.includes('Compare &')) return match;
                
                // Remove all <br> and newlines, extra spaces to normalize the string
                let cleanText = h1Content.replace(/<br>/gi, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
                
                // Now it should look like:
                // "Top Packers and Movers in india , Compare & <span>Save upto 25%*</span>"
                // or "Top Car Transportation in India, Compare & <span>Save upto 25%*</span>"
                
                // Regex to extract Service and Location
                const extractRegex = /Top (.*?) in (.*?) ,? Compare & <span>Save upto 25%\*<\/span>/i;
                const extracted = cleanText.match(extractRegex);
                
                if (extracted) {
                    let service = extracted[1].trim();
                    let location = extracted[2].trim();
                    
                    // The user wants:
                    // Top [Service] <br>in [Location], Compare & <br><span>Save upto 25%*</span>
                    
                    // Capitalize location properly (e.g. "india" -> "India")
                    location = location.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
                    
                    let rebuilt = `<h1>Top ${service} <br>in ${location}, Compare & <br><span>Save upto 25%*</span></h1>`;
                    return rebuilt;
                }
                
                return match;
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
