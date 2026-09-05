<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bank Details - Household Packers</title>
    <meta name="description" content="Bank details for NEFT Transfer to Household Packers.">
    <meta name="keywords" content="bank details, neft transfer, household packers bank account">
    
    <!-- Open Graph for Social Media -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.householdpackers.com/bank-details.html">
    <meta property="og:title" content="Bank Details - Household Packers">
    <meta property="og:description" content="Bank details for NEFT Transfer to Household Packers.">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Bank Details - Household Packers">
    <meta name="twitter:description" content="Bank details for NEFT Transfer to Household Packers.">

    <!-- Canonical Tag -->
    <link rel="canonical" href="https://www.householdpackers.com/bank-details.php" />

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Stylesheet -->
    <link rel="stylesheet" href="css/style.css?v=2">
</head>
<body>

    <!-- Header Section -->
    <?php include 'header.php'; ?>

    <!-- Page Banner -->
    <section class="page-banner" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); padding: 80px 0 40px; text-align: center; color: white;">
        <div class="container">
            <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Bank Details</h1>
            <p style="font-size: 1.1rem; opacity: 0.9;">Bank A/c Details for NEFT Transfer.</p>
        </div>
    </section>

    <!-- Bank Details Content -->
    <section class="privacy-section" style="padding: 60px 0; background-color: var(--bg-light);">
        <div class="container">
            <div class="privacy-content" style="background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); color: var(--text-dark); line-height: 1.8;">
                
                <h3 style="color: var(--primary-color); font-size: 1.5rem; margin-bottom: 15px; border-bottom: 2px solid #eee; padding-bottom: 10px;">Account Information</h3>
                
                <ul style="list-style: none; padding: 0; margin-bottom: 25px;">
                    <li style="margin-bottom: 10px; font-size: 1.1rem;"><strong>A/C Name:</strong> Mynaa Tech Services Pvt Ltd</li>
                    <li style="margin-bottom: 10px; font-size: 1.1rem;"><strong>Bank Name:</strong> Yes Bank</li>
                    <li style="margin-bottom: 10px; font-size: 1.1rem;"><strong>A/C No:</strong> 010583800008310</li>
                    <li style="margin-bottom: 10px; font-size: 1.1rem;"><strong>IFSC Code:</strong> YESB0000105</li>
                    <li style="margin-bottom: 10px; font-size: 1.1rem;"><strong>Branch:</strong> Sector 14, Gurugram.</li>
                </ul>

                <div style="background: rgba(3, 82, 208, 0.05); border-left: 4px solid var(--primary-color); padding: 15px 20px; border-radius: 4px;">
                    <p style="margin: 0; font-weight: 500;"><strong>Note:</strong> Please send the receipt copy of deposit amount at <a href="mailto:support@householdpackers.com" style="color: var(--primary-color); text-decoration: underline;">support@householdpackers.com</a> after making the payment.</p>
                </div>
                
            </div>
        </div>
    </section>

    <!-- Footer Section -->
    <?php include 'footer.php'; ?>
    
    <!-- Scripts -->
    <script>
        // Mobile Menu Toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
        
        // Populate Calculator Distances
        const moveDistanceSelect = document.getElementById('moveDistance');
        if (moveDistanceSelect) {
            const distances = [
                { value: 'up_to_10_km', label: 'Up to 10 Km' },
                { value: '11_20_km', label: '11 - 20 Km' },
                { value: '21_30_km', label: '21 - 30 Km' },
                { value: '31_km_and_above', label: '31 Km and above' }
            ];
            
            distances.forEach(dist => {
                const option = document.createElement('option');
                option.value = dist.value;
                option.textContent = dist.label;
                moveDistanceSelect.appendChild(option);
            });
        }
        
        // Simple Calculator Logic (Mockup)
        const calcBtn = document.getElementById('calcBtn');
        if (calcBtn) {
            calcBtn.addEventListener('click', function() {
                const moveType = document.getElementById('moveType').value;
                const propertyType = document.getElementById('propertyType').value;
                const distance = document.getElementById('moveDistance').value;
                const calcResult = document.getElementById('calcResult');
                const calcPrice = document.getElementById('calcPrice');
                
                let minPrice = 3000;
                let maxPrice = 5000;
                
                // Adjust based on property
                if (propertyType === '2bhk') { minPrice += 2000; maxPrice += 3000; }
                if (propertyType === '3bhk') { minPrice += 5000; maxPrice += 7000; }
                if (propertyType === '4bhk') { minPrice += 8000; maxPrice += 12000; }
                if (propertyType === 'complete') { minPrice += 12000; maxPrice += 18000; }
                
                // Adjust based on distance
                if (moveType === 'long') { minPrice *= 2; maxPrice *= 2.5; }
                
                calcPrice.textContent = `₹${minPrice.toLocaleString('en-IN')} - ₹${maxPrice.toLocaleString('en-IN')}`;
                calcResult.style.display = 'block';
            });
        }
    </script>
</body>
</html>

