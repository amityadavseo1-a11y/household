const fs = require('fs');
const path = require('path');

const dirPath = '.';
let count = 0;

const searchRegex = /<label><input type="checkbox" name="shift_type" value="Household"> Household<\/label>\s*<label><input type="checkbox" name="shift_type" value="Car"> Car<\/label>\s*<label><input type="checkbox" name="shift_type" value="Bike"> Bike<\/label>\s*<\/div>/g;

const replacementBlock = `<label><input type="checkbox" name="shift_type" value="Household" id="household_checkbox"> Household</label>
                        <label><input type="checkbox" name="shift_type" value="Car"> Car</label>
                        <label><input type="checkbox" name="shift_type" value="Bike"> Bike</label>
                    </div>
                    
                    <div class="household-type-container" id="householdTypeContainer" style="display: none;">
                        <h4 class="household-title">Choose the Household Type</h4>
                        <div class="household-grid">
                            <label class="household-card">
                                <input type="radio" name="household_type" value="Single Item">
                                <div class="card-content">
                                    <div class="radio-indicator"></div>
                                    <div class="card-text">
                                        <h5>Single Item</h5>
                                        <p>Single items like Books, Clothes, Luggage, Mattress etc</p>
                                    </div>
                                </div>
                            </label>
                            <label class="household-card">
                                <input type="radio" name="household_type" value="Few Items">
                                <div class="card-content">
                                    <div class="radio-indicator"></div>
                                    <div class="card-text">
                                        <h5>Few Items</h5>
                                        <p>2-5 cartons/boxes, Single bedroom items without any furniture</p>
                                    </div>
                                </div>
                            </label>
                            <label class="household-card">
                                <input type="radio" name="household_type" value="1BHK">
                                <div class="card-content">
                                    <div class="radio-indicator"></div>
                                    <div class="card-text">
                                        <h5>1BHK</h5>
                                        <p>Furniture + Complete household items for 1BHK</p>
                                    </div>
                                </div>
                            </label>
                            <label class="household-card">
                                <input type="radio" name="household_type" value="2BHK+">
                                <div class="card-content">
                                    <div class="radio-indicator"></div>
                                    <div class="card-text">
                                        <h5>2BHK+</h5>
                                        <p>Furniture + Complete household items for 2BHK or more</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>`;

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git')) {
                walk(file);
            }
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(file, 'utf8');
            let newContent = content.replace(searchRegex, replacementBlock);
            if (content !== newContent) {
                fs.writeFileSync(file, newContent, 'utf8');
                count++;
            }
        }
    });
}

walk(dirPath);
console.log(`Modified ${count} files`);
