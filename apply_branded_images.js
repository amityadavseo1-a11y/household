const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');
let updatedCount = 0;

const brandedImages = [
    'images/branded_truck_1.jpg',
    'images/branded_truck_2.jpg',
    'images/branded_truck_3.jpg',
    'images/branded_truck_4.jpg',
    'images/branded_truck_5.jpg'
];

function getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

for (const file of files) {
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
        file !== 'paytm_curl.php' &&
        file !== 'packers-and-movers-mumbai.php' // leave Mumbai as is, it has its own custom image
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

            // Pick a deterministic branded image based on city name
            const imgIndex = getHash(city) % brandedImages.length;
            const selectedImage = brandedImages[imgIndex];

            // Some files might still have 'picsum.photos' from my previous script, 
            // others might have older images. I'll catch both.
            
            // Replace Hero Background Image
            const heroRegex = /background-image:\s*url\(['"]?(?:images\/[a-zA-Z0-9_]+\.jpg|https:\/\/picsum\.photos[^'"]+)['"]?\)/g;
            content = content.replace(heroRegex, `background-image: url('${selectedImage}')`);
            
            // Replace About Image
            const aboutImgRegex = /<img src=["'](?:images\/(?:about_)?[a-zA-Z0-9_]+\.jpg|https:\/\/picsum\.photos[^'"]+)["'] alt=["']Household Packers in [^"']+["']/g;
            // Also handle if the alt text is slightly different (like just "Household Packers")
            const fallbackAboutImgRegex = /<img src=["'](?:images\/(?:about_)?[a-zA-Z0-9_]+\.jpg|https:\/\/picsum\.photos[^'"]+)["'] alt=["']Household Packers["']/g;

            content = content.replace(aboutImgRegex, `<img src="${selectedImage}" alt="Household Packers in ${city}"`);
            content = content.replace(fallbackAboutImgRegex, `<img src="${selectedImage}" alt="Household Packers"`);
            
            if (content !== originalContent) {
                fs.writeFileSync(file, content, 'utf8');
                updatedCount++;
            }
        }
    }
}

console.log(`Updated images in ${updatedCount} city pages with branded Household Packers trucks.`);
