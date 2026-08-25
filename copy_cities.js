const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const citiesSectionMatch = indexHtml.match(/<!-- Cities We Cover Section -->[\s\S]*?<\/section>/);

if (citiesSectionMatch) {
    const citiesSection = citiesSectionMatch[0];

    const pages = [
        { file: 'house-shifting.html', keyword: 'House Shifting' },
        { file: 'office-relocation.html', keyword: 'Office Relocation' },
        { file: 'car-transportation.html', keyword: 'Car Transportation' },
        { file: 'bike-transportation.html', keyword: 'Bike Transportation' },
        { file: 'furniture-shifting.html', keyword: 'Furniture Shifting' },
        { file: 'packers-and-movers.html', keyword: 'Packers and Movers' }
    ];

    let updatedCount = 0;

    for (const page of pages) {
        let content = fs.readFileSync(page.file, 'utf8');

        // Check if it already has the cities section
        if (content.includes('<!-- Cities We Cover Section -->')) {
            // Remove the existing one just in case
            content = content.replace(/<!-- Cities We Cover Section -->[\s\S]*?<\/section>/, '');
        }

        // Prepare the new section for this page
        // We want to replace ">Packers and Movers in " with `>${page.keyword} in `
        const newCitiesSection = citiesSection.replace(/>Packers and Movers in /g, `>${page.keyword} in `);

        // Insert before <!-- Popular Routes Section -->
        if (content.includes('<!-- Popular Routes Section -->')) {
            content = content.replace('<!-- Popular Routes Section -->', newCitiesSection + '\n\n    <!-- Popular Routes Section -->');
            fs.writeFileSync(page.file, content, 'utf8');
            updatedCount++;
            console.log(`Successfully updated ${page.file} with keyword "${page.keyword}"`);
        } else {
            console.log(`Error: Could not find <!-- Popular Routes Section --> in ${page.file}`);
        }
    }

    console.log(`Done. Updated ${updatedCount} files.`);
} else {
    console.log("Error: Could not find Cities We Cover Section in index.html");
}
