const fs = require('fs');

const files = fs.readdirSync('.');
let updatedCount = 0;

for (const f of files) {
    // Only target location pages, e.g., house-shifting-agra.html, but NOT house-shifting.html
    // A simple way is to check if it has two hyphens or matches our known prefixes + city
    if (f.endsWith('.html') && f !== 'index.html') {
        // Find if this is a city page
        // Let's extract the city name if possible. 
        // We know that generic pages are: house-shifting.html, office-relocation.html, etc.
        const generics = [
            'house-shifting.html', 'office-relocation.html', 'car-transportation.html', 
            'bike-transportation.html', 'furniture-shifting.html', 'packers-and-movers.html'
        ];
        
        if (!generics.includes(f)) {
            // It's a city page.
            let content = fs.readFileSync(f, 'utf8');
            
            // To get the city name, we can look at the H1 which is correctly formatted:
            // <h1>Top House Shifting service in Agra , <br>
            const h1Match = content.match(/<h1>Top .*? service in (.*?) , <br>/);
            if (h1Match) {
                const cityName = h1Match[1];
                
                // Now replace "Services India –" with "Services ${cityName} –" in the charges title
                // Just in case it's "Services India -" or something, let's use a regex
                const chargesRegex = /Services India\s*([–\-])\s*<span/g;
                if (chargesRegex.test(content)) {
                    content = content.replace(chargesRegex, `Services ${cityName} $1 <span`);
                    fs.writeFileSync(f, content, 'utf8');
                    updatedCount++;
                }
            }
        }
    }
}

console.log(`Updated Price & Charges title in ${updatedCount} location pages.`);
