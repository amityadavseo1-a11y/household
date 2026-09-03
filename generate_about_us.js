const fs = require('fs');
let content = fs.readFileSync('privacy-policy.html', 'utf8');

// Replace Title
content = content.replace(/<title>.*<\/title>/, '<title>About Us - Household Packers</title>');

// Replace Page Banner
content = content.replace(/<h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Privacy Policy<\/h1>/, '<h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">About Us</h1>');
content = content.replace(/<p style="font-size: 1.1rem; opacity: 0.9;">Last updated: .*<\/p>/, `<p style="font-size: 1.1rem; opacity: 0.9;">India's Largest Network of Home Packers and Movers</p>`);

// Replace Content Section
const aboutHtml = `
            <div style="display: flex; flex-wrap: wrap; gap: 40px;">
                <div class="privacy-content" style="flex: 1 1 60%; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); color: var(--text-dark); line-height: 1.8; min-width: 300px;">
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 15px;">Who We Are</h3>
                        <p style="margin-bottom: 15px;">Householdpackers.com is India's Largest Network of Home Packers and Movers. We connect customers to the best and the most professional movers and packers in the country. With the largest network of transporters, carriers, packers and movers in the country, we are your one-stop shop for all home shifting and transport needs. We provide the most authentic and cheapest rates for shifting any household item, car or bike across India.</p>
                        <p style="margin-bottom: 15px;">We currently have tie-ups with over 1500+ verified transporters covering all cities and towns in the country. Our online quote engine helps you compare quotes from multiple transporters and choose the best option. Most of our Premium Transport Partners are verified, thereby ensuring 100% safe and secure packing and moving.</p>
                        <p style="margin-bottom: 15px;">At Householdpackers, we have the ability to provide customized home relocation packages as per the needs of our customers. Our multiple tier quality control process ensures that your valuables are shifted on time and without any damage. Our logistics team is the best in the business and we compromise at nothing.</p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 15px;">What We Offer</h3>
                        <p style="margin-bottom: 15px;">We offer the best, customised and cheapest home relocation service to you. As a customer you get:</p>
                        
                        <ul style="list-style: none; padding-left: 0; margin-bottom: 15px;">
                            <li style="margin-bottom: 12px; position: relative; padding-left: 25px;"><span style="color: #4CAF50; position: absolute; left: 0; font-weight: bold;">✓</span> <strong>Access to a large number of Verified Packers and Movers:</strong> By registering with us, you get access to the biggest database of home and vehicle transporters in India.</li>
                            <li style="margin-bottom: 12px; position: relative; padding-left: 25px;"><span style="color: #4CAF50; position: absolute; left: 0; font-weight: bold;">✓</span> <strong>Save Time:</strong> Forget the hassle of scouting around the internet for a good home transportation company.</li>
                            <li style="margin-bottom: 12px; position: relative; padding-left: 25px;"><span style="color: #4CAF50; position: absolute; left: 0; font-weight: bold;">✓</span> <strong>Get competitive quotes:</strong> Compare the best rates of all the packers and movers in India and choose.</li>
                            <li style="margin-bottom: 12px; position: relative; padding-left: 25px;"><span style="color: #4CAF50; position: absolute; left: 0; font-weight: bold;">✓</span> <strong>Personalised Services:</strong> Get customised household moving solutions which suit your requirement and pocket.</li>
                        </ul>
                    </div>
                </div>
                
                <div style="flex: 1 1 35%; min-width: 300px;">
                    <div style="background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); position: sticky; top: 120px;">
                        <h3 style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 10px; text-align: center;">Get a Free Quote</h3>
                        <p style="text-align: center; color: var(--text-light); margin-bottom: 20px;">Fill details and get best price instantly</p>
                        
                        <form style="display: flex; flex-direction: column; gap: 15px;">
                            <input type="text" placeholder="Name *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="tel" placeholder="Mobile *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="text" placeholder="Moving From *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            <input type="text" placeholder="Moving To *" required style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; width: 100%; outline: none;">
                            
                            <div class="captcha-box" style="display: flex; align-items: center; justify-content: space-between; background: #f9f9f9; border: 1px solid #d3d3d3; border-radius: 3px; padding: 8px 10px; width: auto; margin-bottom: 5px; box-shadow: 0 0 4px 1px rgba(0,0,0,0.08); flex-shrink: 0;">
                                <div style="display: flex; align-items: center;">
                                    <input type="checkbox" id="about-robot" style="width: 28px; height: 28px; margin-right: 12px; cursor: pointer;"> 
                                    <label for="about-robot" style="font-size: 14px; font-weight: 500; color: #222; cursor: pointer; font-family: 'Roboto', sans-serif;">I'm not a robot</label>
                                </div>
                                <div style="display: flex; flex-direction: column; align-items: center; margin-left: 10px;">
                                    <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" style="width: 24px; height: 24px; margin-bottom: 2px;">
                                    <span style="font-size: 9px; color: #555; font-family: 'Roboto', sans-serif;">reCAPTCHA</span>
                                </div>
                            </div>
                            
                            <button type="button" class="btn btn-primary" style="background-color: #2679a4; padding: 12px 24px; font-size: 1.1rem; border-radius: 6px; border: none; cursor: pointer; font-weight: 600; color: white; width: 100%; margin-top: 5px;">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
`;

// Replace the inner content of the privacy-content div and the wrapper
content = content.replace(/<div class="privacy-content"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, aboutHtml + '\n        </div>\n    </section>');

fs.writeFileSync('about-us.html', content, 'utf8');
console.log('Created about-us.html');
