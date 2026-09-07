const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');
let updatedCount = 0;

for (const file of files) {
    // Only process city pages
    if (file.endsWith('.php') && 
        file !== 'index.php' && 
        file !== 'packers-and-movers.php' && 
        file !== 'house-shifting.php' && 
        file !== 'office-relocation.php' && 
        file !== 'car-transportation.php' && 
        file !== 'bike-transportation.php' && 
        file !== 'furniture-shifting.php' && 
        file !== 'bank-details.php' && 
        file !== 'blog.php' && 
        file !== 'privacy-policy.php' && 
        file !== 'terms-and-conditions.php' &&
        file !== 'header.php' && 
        file !== 'footer.php' &&
        file !== 'contact-us.php' &&
        file !== 'about-us.php' &&
        file !== 'join-as-vendor.php' &&
        file !== 'paytm.php' &&
        file !== 'paytm_curl.php'
    ) {
        
        let city = '';
        if (file.startsWith('packers-and-movers-')) {
            city = file.replace('packers-and-movers-', '').replace('.php', '');
        } else if (file.startsWith('house-shifting-')) {
            city = file.replace('house-shifting-', '').replace('.php', '');
        } else if (file.startsWith('office-relocation-')) {
            city = file.replace('office-relocation-', '').replace('.php', '');
        } else if (file.startsWith('car-transportation-')) {
            city = file.replace('car-transportation-', '').replace('.php', '');
        } else if (file.startsWith('bike-transportation-')) {
            city = file.replace('bike-transportation-', '').replace('.php', '');
        } else if (file.startsWith('furniture-shifting-')) {
            city = file.replace('furniture-shifting-', '').replace('.php', '');
        }
        
        if (city) {
            let content = fs.readFileSync(file, 'utf8');
            let originalContent = content;

            // Replace Hero Background Image
            // We match the style attribute in the hero-carousel
            const heroRegex = /background-image:\s*url\(['"]?(?:images\/[a-zA-Z0-9_]+\.jpg|https:\/\/picsum\.photos[^'"]+)['"]?\)/g;
            content = content.replace(heroRegex, `background-image: url('https://picsum.photos/seed/${city}_hero/1920/1080')`);
            
            // Replace About Image
            // We match the img src inside the about section
            const aboutImgRegex = /<img src=["'](?:images\/about_[a-zA-Z0-9_]+\.jpg|https:\/\/picsum\.photos[^'"]+)["'] alt=["']Household Packers in [^"']+["']/g;
            content = content.replace(aboutImgRegex, `<img src="https://picsum.photos/seed/${city}_about/600/400" alt="Household Packers in ${city}"`);
            
            if (content !== originalContent) {
                fs.writeFileSync(file, content, 'utf8');
                updatedCount++;
            }
        }
    }
}

console.log(`Updated images in ${updatedCount} city pages.`);
