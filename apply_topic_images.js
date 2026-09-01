const fs = require('fs');
const path = require('path');

const dirPath = '.';
const stats = {
    bike: 0,
    car: 0,
    furniture: 0,
    house: 0,
    office: 0,
    general: 0
};

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                walk(filePath);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Determine which image to use based on filename prefix
            let imageName = 'about_general.jpg'; // default
            let category = 'general';
            
            const baseName = path.basename(file).toLowerCase();
            if (baseName.startsWith('bike')) {
                imageName = 'about_bike.jpg';
                category = 'bike';
            } else if (baseName.startsWith('car')) {
                imageName = 'about_car.jpg';
                category = 'car';
            } else if (baseName.startsWith('furniture')) {
                imageName = 'about_furniture.jpg';
                category = 'furniture';
            } else if (baseName.startsWith('house') || baseName.startsWith('local')) {
                imageName = 'about_house.jpg';
                category = 'house';
            } else if (baseName.startsWith('office')) {
                imageName = 'about_office.jpg';
                category = 'office';
            } else if (baseName.startsWith('packers')) {
                imageName = 'about_general.jpg';
                category = 'general';
            }
            
            // Replace the about image src
            const regex = /(<div class="about-image-container">\s*<img src=")[^"]+(" alt="Household Packers">)/gi;
            const newContent = content.replace(regex, `$1images/${imageName}$2`);
            
            if (content !== newContent) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                stats[category]++;
            }
        }
    });
}

walk(dirPath);
console.log('Modified files count:');
console.table(stats);
