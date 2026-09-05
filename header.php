<header>
        <div class="container navbar">
            <a href="index.html" class="logo">
                <img src="images/logo.png" alt="Household Packers" class="site-logo">
            </a>
            <div class="mobile-actions">
                <div class="mobile-quote-wrapper" style="display: flex; flex-direction: column; align-items: center; position: relative;">
                    <a href="#contact" class="mobile-quote-btn">GET QUOTES</a>
                    <a href="tel:+919355231695" style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 2px; font-size: 0.75rem; color: #4e4c4c; font-weight: 600; text-decoration: none; white-space: nowrap;">📞 +91 9355231695</a>
                </div>
                <div class="mobile-menu-btn">&#9776;</div>
            </div>
            <ul class="nav-links">
                <li><a href="index.html">HOME</a></li>
                <li class="dropdown">
                    <a href="#services" class="dropbtn">SERVICES <span style="font-size: 0.8em;">&#9662;</span></a>
                    <div class="dropdown-content">
                        <a href="house-shifting.html">HOUSE SHIFTING</a>
                        <a href="office-relocation.html">OFFICE RELOCATION</a>
                        <a href="car-transportation.html">CAR TRANSPORTATION</a>
                        <a href="bike-transportation.html">BIKE TRANSPORTATION</a>
                        <a href="furniture-shifting.html">FURNITURE SHIFTING</a>
                        <a href="packers-and-movers.html">PACKERS AND MOVERS</a>
                    </div>
                </li>
                <li><a href="join-as-vendor.html">JOIN AS VENDOR</a></li>
                <li class="dropdown">
                    <a href="#" class="dropbtn">CALCULATOR <span style="font-size: 0.8em;">&#9662;</span></a>
                    <div class="dropdown-content calc-dropdown-content" style="width: 350px; padding: 20px; right: 0; left: auto; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border-radius: 10px; border-top: 3px solid var(--primary-color);">
                        <h4 style="color: var(--text-dark); margin-bottom: 15px; font-size: 1.1rem; border-bottom: 1px solid #eee; padding-bottom: 10px; text-align: center;">Get Instant Estimate</h4>
                        <!-- Calculator Form -->
                        <div class="calc-form" style="display: flex; flex-direction: column; gap: 12px;">
                            <div class="calc-group" style="display: flex; flex-direction: column;">
                                <label for="moveType" style="font-size: 0.85rem; font-weight: 600; margin-bottom: 5px; color: var(--text-light);">Move Type</label>
                                <select id="moveType" class="calc-select" style="padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.9rem; outline: none; background-color: #fcfcfc;">
                                    <option value="local">Local Delhi Moves (Short Distance)</option>
                                    <option value="long">Long Distance & Intercity</option>
                                </select>
                            </div>
                            <div class="calc-group" style="display: flex; flex-direction: column;">
                                <label for="propertyType" style="font-size: 0.85rem; font-weight: 600; margin-bottom: 5px; color: var(--text-light);">Property Size</label>
                                <select id="propertyType" class="calc-select" style="padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.9rem; outline: none; background-color: #fcfcfc;">
                                    <option value="1bhk">1 BHK</option>
                                    <option value="2bhk">2 BHK</option>
                                    <option value="3bhk">3 BHK</option>
                                    <option value="4bhk">4 BHK</option>
                                    <option value="complete">Complete Home</option>
                                </select>
                            </div>
                            <div class="calc-group" style="display: flex; flex-direction: column;">
                                <label for="moveDistance" style="font-size: 0.85rem; font-weight: 600; margin-bottom: 5px; color: var(--text-light);">Distance</label>
                                <select id="moveDistance" class="calc-select" style="padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.9rem; outline: none; background-color: #fcfcfc;">
                                    <!-- Populated dynamically via JS -->
                                </select>
                            </div>
                            <button id="calcBtn" class="btn btn-primary calc-btn" style="width: 100%; padding: 12px; font-size: 1rem; border-radius: 6px; border:none; cursor:pointer; margin-top: 5px;">Calculate Now</button>
                        </div>
                        <div class="calc-result" id="calcResult" style="display: none; margin-top: 15px; padding: 15px; background: linear-gradient(135deg, rgba(3, 82, 208, 0.05) 0%, rgba(9, 159, 199, 0.05) 100%); border-radius: 8px; text-align: center; border: 1px solid rgba(3, 82, 208, 0.1);">
                            <h5 style="font-size: 0.9rem; color: var(--text-light); margin-bottom: 5px;">Estimated Cost:</h5>
                            <div class="calc-price" id="calcPrice" style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color);">₹0 - ₹0</div>
                        </div>
                    </div>
                </li>
                <li class="contact-number desktop-only" style="display: flex; align-items: center;"><a href="tel:+919355231695" style="display: flex; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#4CAF50" width="16" height="16" style="margin-right: 6px;"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg> +91- 9355231695</a></li>
                <li class="desktop-only"><a href="#contact" style="background: #0277bd; color: white; padding: 8px 18px; border-radius: 20px; font-weight: 600; box-shadow: 0 4px 10px rgba(2, 119, 189, 0.3); transition: transform 0.3s ease;">GET FREE QUOTES</a></li>
            </ul>
        </div>
    </header>
