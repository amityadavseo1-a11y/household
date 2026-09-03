const fs = require('fs');
let content = fs.readFileSync('bank-details.html', 'utf8');

// Replace Title
content = content.replace(/<title>.*<\/title>/, '<title>Contact Us - Household Packers</title>');

// Replace Page Banner
content = content.replace(/<h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Bank Details<\/h1>/, '<h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Contact Us</h1>');
content = content.replace(/<p style="font-size: 1.1rem; opacity: 0.9;">Bank A\/c Details for NEFT Transfer.<\/p>/, '<p style="font-size: 1.1rem; opacity: 0.9;">Get in touch with us for household relocation and home shifting services.</p>');

// Replace Content Section
const contactHtml = `
                <div style="display: flex; flex-wrap: wrap; gap: 40px;">
                    <div style="flex: 1; min-width: 300px;">
                        <h3 style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Get in Touch</h3>
                        <p style="margin-bottom: 20px;">Send us an email to <a href="mailto:support@householdpackers.com" style="color: var(--primary-color); text-decoration: underline;">support@householdpackers.com</a> or fill in the following form.</p>
                        
                        <form style="display: flex; flex-direction: column; gap: 15px;">
                            <input type="text" placeholder="Name *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="email" placeholder="E-Mail *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="tel" placeholder="Mobile *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="text" placeholder="Subject *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <textarea placeholder="Requirement" rows="4" style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;"></textarea>
                            <button type="button" class="btn btn-primary" style="padding: 12px 24px; font-size: 1.1rem; border-radius: 6px; border: none; cursor: pointer; font-weight: 600; width: fit-content;">Send Message</button>
                        </form>
                    </div>
                    
                    <div style="flex: 1; min-width: 300px;">
                        <h3 style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Contact Information</h3>
                        
                        <div style="margin-bottom: 25px;">
                            <h4 style="font-size: 1.2rem; margin-bottom: 5px; color: var(--text-dark);">Call Us</h4>
                            <p style="font-size: 1.1rem;"><a href="tel:+918130995752" style="color: var(--text-light); text-decoration: none;">+91-8130995752</a><br><a href="tel:+919355231695" style="color: var(--text-light); text-decoration: none;">+91-9355231695</a></p>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <h4 style="font-size: 1.2rem; margin-bottom: 5px; color: var(--text-dark);">Email Us</h4>
                            <p style="font-size: 1.1rem;"><a href="mailto:support@householdpackers.com" style="color: var(--text-light); text-decoration: none;">support@householdpackers.com</a></p>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <h4 style="font-size: 1.2rem; margin-bottom: 5px; color: var(--text-dark);">Address</h4>
                            <p style="font-size: 1.1rem; line-height: 1.6; color: var(--text-light);">K 194, First Floor, South City I, Sector 41,<br>Gurugram, Haryana 122001</p>
                        </div>
                    </div>
                </div>
`;

content = content.replace(/<h3 style="color: var\(--primary-color\); font-size: 1.5rem; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Account Information<\/h3>[\s\S]*?<\/div>\s*<\/div>/, contactHtml + '\n            </div>');

fs.writeFileSync('contact-us.html', content, 'utf8');
console.log('Created contact-us.html');
