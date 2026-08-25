import re, json
from pathlib import Path
from collections import Counter

root = Path(__file__).resolve().parent.parent
js = (root / 'assets/product-images.js').read_text(encoding='utf-8')
files = json.loads(re.search(r'const IMG_FILES = (\{[\s\S]*?\});', js).group(1))

def resolve_keys(keys):
    return [files.get(k, '?' + k) for k in keys]

def component_dups(block):
    issues = []
    for label, pattern in [
        ('poster', r'posterAsm:\s*\{[\s\S]*?slots:\s*\[([\s\S]*?)\]\s*\}'),
        ('products', r'products:\s*\[([\s\S]*?)\]\s*\n\s*\}'),
        ('recommend', r'recommend:\s*\[([\s\S]*?)\]\s*\n\s*\}'),
    ]:
        for m in re.finditer(pattern, block):
            imgs = resolve_keys(re.findall(r'IMG\.([a-zA-Z0-9]+)', m.group(1)))
            dups = [x for x, c in Counter(imgs).items() if c > 1]
            if dups:
                issues.append((label, dups))
    return issues

text = (root / '03.活动页-原型页面.html').read_text(encoding='utf-8')
for aid in ['apple-wear', 'water', 'menswear', 'nike-sport']:
    m = re.search(rf"'{aid}':\s*\{{([\s\S]*?)\n  \}}", text)
    block = m.group(1) if m else ''
    keys = re.findall(r'IMG\.([a-zA-Z0-9]+)', block)
    cnt = Counter(resolve_keys(keys))
    banner = re.search(r'banner:\s*\{[^}]*img:\s*IMG\.([a-zA-Z0-9]+)', block)
    if banner:
        cnt[files.get(banner.group(1), '?')] += 0
    over = sorted([(f, c) for f, c in cnt.items() if c > 3], key=lambda x: -x[1])
    missing = sorted({k for k in keys if k not in files})
    print(f'=== {aid} ===')
    print('  refs', len(keys), 'unique', len(cnt), 'page>3', over)
    print('  component dups', component_dups(block))
    if missing:
        print('  missing keys', missing)
    for f, c in sorted(cnt.items(), key=lambda x: -x[1]):
        if c > 3:
            keys_for = [k for k in re.findall(r'IMG\.([a-zA-Z0-9]+)', block) if files.get(k) == f]
            print('   ', c, f, '<-', keys_for[:8])

home = (root / '01.首页-原型页面.html').read_text(encoding='utf-8')
keys = re.findall(r'IMG\.([a-zA-Z0-9]+)', home)
cnt = Counter(resolve_keys(keys))
print('=== homepage ===')
print('  page>3', [(f, c) for f, c in cnt.items() if c > 3])

for html in sorted(root.glob('*.html')):
    if html.name in ('01.首页-原型页面.html', '03.活动页-原型页面.html'):
        continue
    text = html.read_text(encoding='utf-8')
    keys = re.findall(r'IMG\.([a-zA-Z0-9]+)', text)
    if not keys:
        continue
    cnt = Counter(resolve_keys(keys))
    over = [(f, c) for f, c in cnt.items() if c > 3]
    missing = sorted({k for k in keys if k not in files})
    if over or missing:
        print(f'=== {html.name} ===')
        if over:
            print('  page>3', over)
        if missing:
            print('  missing keys', missing)
