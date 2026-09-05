import os
import re

def to_title_case(text):
    return ' '.join(word.capitalize() for word in text.split('-'))

base_pages = {
    'index.html', 'about-us.html', 'contact-us.html', 
    'privacy-policy.html', 'terms-and-conditions.html', 
    'bank-details.html', 'blog.html', 'join-as-vendor.html',
    'packers-and-movers.html', 'house-shifting.html',
    'office-relocation.html', 'car-transportation.html',
    'bike-transportation.html', 'furniture-shifting.html'
}

services = [
    'packers-and-movers', 'house-shifting', 'office-relocation',
    'car-transportation', 'bike-transportation', 'furniture-shifting'
]

dir_path = '.'
# Pattern to match <img ... alt="anything" ...>
pattern = re.compile(r'(<img[^>]*?alt=)([\'\"])(.*?)\2', re.IGNORECASE | re.DOTALL)

count = 0

for file in os.listdir(dir_path):
    if not file.endswith('.html'):
        continue
    if file in base_pages:
        continue
        
    # Extract city name
    city_slug = None
    for service in services:
        if file.startswith(service + '-'):
            city_slug = file[len(service)+1:-5]
            break
            
    if not city_slug:
        continue
        
    city_name = to_title_case(city_slug)
    
    filepath = os.path.join(dir_path, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    def replacer(match):
        prefix = match.group(1)
        quote = match.group(2)
        return f'{prefix}{quote}Household Packers in {city_name}{quote}'
        
    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f"Updated images alt tags for SEO in {count} city pages.")
