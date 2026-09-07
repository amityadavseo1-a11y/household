const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

const files = fs.readdirSync('.');
const citiesDir = path.join(__dirname, 'images', 'cities');

if (!fs.existsSync(citiesDir)) {
    fs.mkdirSync(citiesDir, { recursive: true });
}

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

async function processAll() {
    console.log('Loading fonts and logo...');
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    // Let's also load the logo to stamp it
    const logo = await Jimp.read('images/logo.png');
    logo.resize(200, Jimp.AUTO); // Resize logo to be a watermark

    // Pre-load the base images to save time
    console.log('Pre-loading base images...');
    const baseJimpImages = [];
    for (const imgPath of brandedImages) {
        baseJimpImages.push(await Jimp.read(imgPath));
    }

    let count = 0;
    
    for (const file of files) {
        if (file.endsWith('.php') && 
            file !== 'packers-and-movers.php' &&
            file !== 'house-shifting.php' &&
            file !== 'office-relocation.php' &&
            file !== 'car-transportation.php' &&
            file !== 'bike-transportation.php' &&
            file !== 'furniture-shifting.php' &&
            file !== 'packers-and-movers-mumbai.php' && // skip mumbai
            file !== 'index.php' && file !== 'bank-details.php' && file !== 'blog.php' && file !== 'privacy-policy.php' && file !== 'terms-and-conditions.php' && file !== 'header.php' && file !== 'footer.php' && file !== 'contact-us.php' && file !== 'about-us.php' && file !== 'join-as-vendor.php' && file !== 'paytm.php' && file !== 'paytm_curl.php'
        ) {
            let city = '';
            if (file.startsWith('packers-and-movers-')) city = file.replace('packers-and-movers-', '');
            else if (file.startsWith('house-shifting-')) city = file.replace('house-shifting-', '');
            else if (file.startsWith('office-relocation-')) city = file.replace('office-relocation-', '');
            else if (file.startsWith('car-transportation-')) city = file.replace('car-transportation-', '');
            else if (file.startsWith('bike-transportation-')) city = file.replace('bike-transportation-', '');
            else if (file.startsWith('furniture-shifting-')) city = file.replace('furniture-shifting-', '');
            
            city = city.replace('.php', '');
            if (!city) continue;

            const imgPath = `images/cities/${city}_hero.jpg`;
            const fullImgPath = path.join(__dirname, imgPath);

            // Skip if already generated to save time, but for this script we want to generate
            // Wait, to process 900 images it might take a few minutes. Let's do it!

            const imgIndex = getHash(city) % baseJimpImages.length;
            const baseImg = baseJimpImages[imgIndex].clone(); // Clone the base image

            // Print text at the bottom
            const text = `HOUSEHOLD PACKERS - ${city.toUpperCase()}`;
            
            // Draw a semi-transparent black rectangle at the bottom to make text readable
            const rectHeight = 100;
            const rectY = baseImg.bitmap.height - rectHeight;
            
            // We can't easily draw primitives in Jimp without a plugin, 
            // but we can just print the text directly, or overlay a dark image.
            // Let's just print the text. FONT_SANS_64_WHITE is white.
            // We can add a drop shadow effect by printing black text slightly offset, then white text.
            const fontBlack = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
            
            const textX = 50;
            const textY = baseImg.bitmap.height - 100;

            // Shadow
            baseImg.print(fontBlack, textX + 4, textY + 4, text);
            // Text
            baseImg.print(font, textX, textY, text);

            // Composite logo at bottom right
            const logoX = baseImg.bitmap.width - logo.bitmap.width - 50;
            const logoY = baseImg.bitmap.height - logo.bitmap.height - 50;
            baseImg.composite(logo, logoX, logoY);

            // Save the image
            await baseImg.writeAsync(fullImgPath);

            // Update the PHP file
            let content = fs.readFileSync(file, 'utf8');
            const heroRegex = /background-image:\s*url\(['"]?(?:images\/branded_truck_\d\.jpg|images\/[a-zA-Z0-9_]+\.jpg|https:\/\/picsum\.photos[^'"]+)['"]?\)/g;
            content = content.replace(heroRegex, `background-image: url('${imgPath}')`);
            
            const aboutImgRegex = /<img src=["'](?:images\/branded_truck_\d\.jpg|images\/(?:about_)?[a-zA-Z0-9_]+\.jpg|https:\/\/picsum\.photos[^'"]+)["'] alt=["']Household Packers[^"']*["']/g;
            content = content.replace(aboutImgRegex, `<img src="${imgPath}" alt="Household Packers in ${city}"`);
            
            fs.writeFileSync(file, content, 'utf8');
            
            count++;
            if (count % 50 === 0) console.log(`Processed ${count} cities...`);
        }
    }
    console.log(`Finished processing ${count} cities.`);
}

processAll().catch(console.error);
