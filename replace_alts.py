import os
import re

dir_path = '.'
pattern = re.compile(r'(<img[^>]*?alt=)([\'\"])(.*?)\2', re.IGNORECASE | re.DOTALL)

count = 0
for root, dirs, files in os.walk(dir_path):
    # skip node_modules
    if 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except UnicodeDecodeError:
                continue
            
            # The regex will capture:
            # 1: `<img ... alt=`
            # 2: quote char `"` or `'`
            # 3: existing alt text
            
            def replacer(match):
                prefix = match.group(1)
                quote = match.group(2)
                return f'{prefix}{quote}Household Packers{quote}'
                
            new_content = pattern.sub(replacer, content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f'Modified {count} files')
