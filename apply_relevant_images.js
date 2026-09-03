const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');
let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('.html') && file !== 'index.html' && file !== 'bank-details.html' && file !== 'blog.html' && file !== 'privacy-policy.html' && file !== 'terms-and-conditions.html') {
        
        let heroImg = 'packers_and_movers.jpg';
        let aboutImg = 'about_general.jpg';

        if (file.includes('house-shifting') || file.includes('local-shifting')) {
            heroImg = 'house_shifting.jpg';
            aboutImg = 'about_house.jpg';
        } else if (file.includes('office-relocation')) {
            heroImg = 'office_relocation.jpg';
            aboutImg = 'about_office.jpg';
        } else if (file.includes('car-transportation')) {
            heroImg = 'car_transportation.jpg';
            aboutImg = 'about_car.jpg';
        } else if (file.includes('bike-transportation')) {
            heroImg = 'bike_transportation.jpg';
            aboutImg = 'about_bike.jpg';
        } else if (file.includes('furniture-shifting')) {
            heroImg = 'furniture_shifting.jpg';
            aboutImg = 'about_furniture.jpg';
        } else if (file.includes('packers-and-movers')) {
            heroImg = 'packers_and_movers.jpg';
            aboutImg = 'about_movers.jpg';
        }

        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Replace Hero Background Image
        // Matches <div class="carousel-slide" style="background-image: url('...'); opacity: 1;"></div>
        const heroRegex = /background-image:\s*url\([^)]+\)/g;
        content = content.replace(heroRegex, `background-image: url('images/${heroImg}')`);
        
        // Replace About Image
        const aboutImgRegex = /<img src="(?:https:\/\/picsum\.photos[^"]+|images\/about_[^"]+\.jpg)" alt="Household Packers[^"]*"/g;
        content = content.replace(aboutImgRegex, `<img src="images/${aboutImg}" alt="Household Packers"`);
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            updatedCount++;
        }
    }
}

console.log(`Updated images to relevant topics in ${updatedCount} pages.`);
