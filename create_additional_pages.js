const fs = require('fs');
const path = require('path');

const houseShiftingTemplate = fs.readFileSync(path.join(__dirname, 'house-shifting.html'), 'utf-8');
const packersTemplate = fs.readFileSync(path.join(__dirname, 'packers-and-movers.html'), 'utf-8');

// 1. tempo-service.html
let tempoContent = houseShiftingTemplate;
tempoContent = tempoContent.replace(/House Shifting Services/gi, 'Tempo Services');
tempoContent = tempoContent.replace(/House Shifting/gi, 'Tempo Service');
tempoContent = tempoContent.replace(/house shifting/gi, 'tempo service');
tempoContent = tempoContent.replace(/images\/house_shifting\.jpg/g, 'images/tempo_service.jpg'); // Adjust image if necessary, but keep structure
tempoContent = tempoContent.replace(/<title>Top Tempo Service/g, '<title>Top Tempo Services');
fs.writeFileSync(path.join(__dirname, 'tempo-service.html'), tempoContent);
console.log('Created tempo-service.html');

// 2. packers-and-movers-near-me.html
let packersNearMeContent = packersTemplate;
packersNearMeContent = packersNearMeContent.replace(/Packers and Movers/g, 'Packers and Movers near me');
packersNearMeContent = packersNearMeContent.replace(/packers and movers/g, 'packers and movers near me');
packersNearMeContent = packersNearMeContent.replace(/<title>Top Packers and Movers near me near me/g, '<title>Top Packers and Movers near me');
fs.writeFileSync(path.join(__dirname, 'packers-and-movers-near-me.html'), packersNearMeContent);
console.log('Created packers-and-movers-near-me.html');

// 3. house-shifting-services-near-me.html
let houseShiftingNearMeContent = houseShiftingTemplate;
houseShiftingNearMeContent = houseShiftingNearMeContent.replace(/House Shifting Services/gi, 'House Shifting Services near me');
houseShiftingNearMeContent = houseShiftingNearMeContent.replace(/House Shifting/gi, 'House Shifting near me');
houseShiftingNearMeContent = houseShiftingNearMeContent.replace(/<title>Top House Shifting near me Services near me/gi, '<title>Top House Shifting Services near me');
fs.writeFileSync(path.join(__dirname, 'house-shifting-services-near-me.html'), houseShiftingNearMeContent);
console.log('Created house-shifting-services-near-me.html');

// 4. cargo-shifting.html
let cargoContent = houseShiftingTemplate;
cargoContent = cargoContent.replace(/House Shifting Services/gi, 'Cargo Shifting Services');
cargoContent = cargoContent.replace(/House Shifting/gi, 'Cargo Shifting');
cargoContent = cargoContent.replace(/house shifting/gi, 'cargo shifting');
fs.writeFileSync(path.join(__dirname, 'cargo-shifting.html'), cargoContent);
console.log('Created cargo-shifting.html');

console.log('All 4 pages created successfully.');
