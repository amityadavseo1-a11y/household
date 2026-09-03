const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');
let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'packers-and-movers.html' && file !== 'house-shifting.html' && file !== 'office-relocation.html' && file !== 'car-transportation.html' && file !== 'bike-transportation.html' && file !== 'furniture-shifting.html' && file !== 'bank-details.html' && file !== 'blog.html' && file !== 'privacy-policy.html' && file !== 'terms-and-conditions.html') {
        
        // Extract city name from file
        // Format is usually <service>-<city>.html or <service>-and-<service>-<city>.html
        let city = '';
        if (file.startsWith('packers-and-movers-')) {
            city = file.replace('packers-and-movers-', '').replace('.html', '');
        } else if (file.startsWith('house-shifting-')) {
            city = file.replace('house-shifting-', '').replace('.html', '');
        } else if (file.startsWith('office-relocation-')) {
            city = file.replace('office-relocation-', '').replace('.html', '');
        } else if (file.startsWith('car-transportation-')) {
            city = file.replace('car-transportation-', '').replace('.html', '');
        } else if (file.startsWith('bike-transportation-')) {
            city = file.replace('bike-transportation-', '').replace('.html', '');
        } else if (file.startsWith('furniture-shifting-')) {
            city = file.replace('furniture-shifting-', '').replace('.html', '');
        }
        
        if (city) {
            let content = fs.readFileSync(file, 'utf8');
            let originalContent = content;

            // 1. Replace Hero Background Image
            const heroRegex = /background-image:\s*url\(['"](https:\/\/images\.unsplash\.com\/[^'"]+)['"]\)/g;
            content = content.replace(heroRegex, `background-image: url('https://picsum.photos/seed/${city}_hero/1920/1080')`);
            
            // 2. Replace About Image
            const aboutImgRegex = /<img src="images\/about_[^"]+\.jpg" alt="Household Packers">/g;
            content = content.replace(aboutImgRegex, `<img src="https://picsum.photos/seed/${city}_about/600/400" alt="Household Packers in ${city}" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); width: 100%; height: auto;">`);
            
            // 3. Replace any other generic images in the content (optional, but let's stick to the main ones)
            // Some pages might have a second hero slide or something. The heroRegex covers all `https://images.unsplash.com/...` urls in background-images.

            if (content !== originalContent) {
                fs.writeFileSync(file, content, 'utf8');
                updatedCount++;
            }
        }
    }
}

console.log(`Updated images in ${updatedCount} city pages.`);
