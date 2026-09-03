const fs = require('fs');
let content = fs.readFileSync('contact-us.html', 'utf8');

// Replace Title
content = content.replace(/<title>.*<\/title>/, '<title>Join as Vendor - Household Packers</title>');

// Replace Page Banner
content = content.replace(/<h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Contact Us<\/h1>/, '<h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Join as Vendor</h1>');
content = content.replace(/<p style="font-size: 1.1rem; opacity: 0.9;">Get in touch with us for household relocation and home shifting services.<\/p>/, `<p style="font-size: 1.1rem; opacity: 0.9;">Partner with India's largest network of verified packers and movers.</p>`);

// Replace the Get in Touch text
content = content.replace(/<h3 style="color: var\(--primary-color\); font-size: 1.5rem; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Get in Touch<\/h3>/, '<h3 style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Vendor Registration</h3>');

content = content.replace(/<p style="margin-bottom: 20px;">Send us an email to <a href="mailto:support@householdpackers.com" style="color: var\(--primary-color\); text-decoration: underline;">support@householdpackers.com<\/a> or fill in the following form.<\/p>/, '<p style="margin-bottom: 20px;">Grow your business with Household Packers. Fill out the registration form below and our team will get back to you.</p>');

// Replace form fields
// Old form has: Name, E-Mail, Mobile, Subject, Requirement
const newFormFields = `
                            <input type="text" placeholder="Company Name *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="text" placeholder="Contact Person *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="email" placeholder="E-Mail Address *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="tel" placeholder="Mobile Number *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="text" placeholder="City *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <textarea placeholder="Services Offered (e.g. Home Shifting, Car Transport)" rows="3" style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;"></textarea>
`;

content = content.replace(/<form style="display: flex; flex-direction: column; gap: 15px;">[\s\S]*?<div class="captcha-box"/, '<form style="display: flex; flex-direction: column; gap: 15px;">\n' + newFormFields + '\n                            <div class="captcha-box"');

fs.writeFileSync('join-as-vendor.html', content, 'utf8');
console.log('Created join-as-vendor.html');
