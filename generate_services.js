const fs = require('fs');

const keywords = [
    { name: 'House Shifting', file: 'house-shifting.html' },
    { name: 'Office Relocation', file: 'office-relocation.html' },
    { name: 'Car Transportation', file: 'car-transportation.html' },
    { name: 'Bike Transportation', file: 'bike-transportation.html' },
    { name: 'Furniture Shifting', file: 'furniture-shifting.html' },
    // Not doing packers-and-movers.html right now to keep the root generic if they want it
];

const template = fs.readFileSync('packers-and-movers-delhi.html', 'utf8');

for (const kw of keywords) {
    let content = template;
    
    // Replace 'Packers and Movers' variations with the service keyword
    content = content.replace(/Packers and Movers/ig, `${kw.name} Services`);
    content = content.replace(/Movers and Packers/ig, `${kw.name} Services`);
    
    // Replace location specifically to make it generic
    content = content.replace(/in Delhi NCR/ig, 'across India');
    content = content.replace(/Delhi NCR/ig, 'India');
    content = content.replace(/New Delhi/ig, 'India');
    content = content.replace(/in Delhi/ig, 'in India');
    content = content.replace(/Delhi/ig, 'India');

    // Fix the footer links so they aren't replaced wrongly by generic regex
    content = content.replace(/<li><a href="#">House Shifting<\/a><\/li>/g, '<li><a href="house-shifting.html">House Shifting</a></li>');
    content = content.replace(/<li><a href="#">Office Relocation<\/a><\/li>/g, '<li><a href="office-relocation.html">Office Relocation</a></li>');
    content = content.replace(/<li><a href="#">Car Transportation<\/a><\/li>/g, '<li><a href="car-transportation.html">Car Transportation</a></li>');
    content = content.replace(/<li><a href="#">Bike Transportation<\/a><\/li>/g, '<li><a href="bike-transportation.html">Bike Transportation</a></li>');
    content = content.replace(/<li><a href="#">Furniture Shifting<\/a><\/li>/g, '<li><a href="furniture-shifting.html">Furniture Shifting</a></li>');
    content = content.replace(/<li><a href="#">Packers and Movers<\/a><\/li>/g, '<li><a href="packers-and-movers.html">Packers and Movers</a></li>');
    
    // Some minor cleanup if "Services Services" got created
    content = content.replace(/Services Services/g, 'Services');
    content = content.replace(/services services/ig, 'services');
    
    // Some minor cleanup if "India India" got created
    content = content.replace(/India India/ig, 'India');

    fs.writeFileSync(kw.file, content, 'utf8');
    console.log(`Updated ${kw.file} with generic location and service replacements.`);
}
