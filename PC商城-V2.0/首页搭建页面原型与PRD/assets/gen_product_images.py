from pathlib import Path
import json

base = Path(__file__).resolve().parent / "products"
all_files = sorted(
    p for p in base.rglob("*")
    if p.is_file() and p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}
)


def rel(p: Path) -> str:
    return str(p.relative_to(base)).replace("\\", "/")


semantic = {
    "watch": "watch.png",
    "sneaker": "sneaker.png",
    "tshirt": "tshirt.png",
    "cake": "cake.png",
    "cinema": "cinema.png",
    "oppo": "oppo-x9/main01.jpg",
}

png_slots = {
    "p2": "p02.png",
    "p4": "p04.png",
    "p6": "p06.png",
    "p8": "p08.png",
    "p9": "p09.png",
    "p15": "p15.png",
    "p17": "p17.png",
    "p19": "p19.png",
    "p23": "p23.png",
    "p24": "p24.png",
    "p28": "p28.png",
    "p34": "p34.png",
    "p55": "p55.png",
    "p56": "p56.png",
}

used = set(semantic.values())
oppo_keep = {f"oppo-x9/{n}" for n in [
    "main01.jpg", "main02.jpg", "main03.jpg", "main04.jpg", "main05.jpg",
    "main06.jpg", "main07.jpg", "main08.jpg", "sku01.jpg", "sku02.jpg",
]}
jpgs = [
    rel(p) for p in all_files
    if p.suffix.lower() in {".jpg", ".jpeg"}
    and rel(p) not in used
    and not rel(p).startswith("oppo-x9/detail")
    and rel(p) not in oppo_keep
]


def take(n: int, pool: list) -> list:
    out = pool[:n]
    del pool[:n]
    return out


pool = list(jpgs)
cats = {
    "watch_band": take(6, pool),
    "headphone": take(8, pool),
    "laptop": take(6, pool),
    "power": take(5, pool),
    "office": take(12, pool),
    "beauty": take(10, pool),
    "food": take(12, pool),
    "drink": take(8, pool),
    "home": take(10, pool),
    "fashion": take(15, pool),
    "sport": take(10, pool),
    "tool": take(6, pool),
    "gift": take(6, pool),
    "misc": pool,
}
idx = {k: 0 for k in cats}
used_files = set(used)


def pick_any(cat: str | None = None) -> str:
    if cat and cats.get(cat):
        while idx[cat] < len(cats[cat]):
            f = cats[cat][idx[cat]]
            idx[cat] += 1
            if f not in used_files:
                used_files.add(f)
                return f
    for f in pool:
        if f not in used_files:
            used_files.add(f)
            return f
    raise RuntimeError("image pool exhausted")


assign = dict(semantic)
assign.update(png_slots)
used_files.update(assign.values())
assign.update({
    "pants": pick_any("fashion"),
    "headphone": pick_any("headphone"),
    "skincare": pick_any("beauty"),
    "chair": pick_any("home"),
    "pumpkin": pick_any("food"),
    "shirt": pick_any("fashion"),
    "bags": pick_any("fashion"),
    "sale": pick_any("gift"),
    "pen": pick_any("office"),
    "camera": pick_any("office"),
    "money": pick_any("gift"),
    "cakeBirthday": pick_any("food"),
    "cakeCupcake": pick_any("food"),
})

p_map = {
    1: pick_any("fashion"), 2: png_slots["p2"], 3: pick_any("sport"), 4: png_slots["p4"],
    5: pick_any("food"), 6: pick_any("headphone"), 7: pick_any("home"), 8: pick_any("office"),
    9: png_slots["p9"], 10: pick_any("sport"), 11: pick_any("fashion"), 12: pick_any("watch_band"),
    13: pick_any("drink"), 14: pick_any("drink"), 15: png_slots["p15"], 16: pick_any("sport"),
    17: png_slots["p17"], 18: pick_any("home"), 19: png_slots["p19"], 20: pick_any("beauty"),
    21: pick_any("office"), 22: pick_any("home"), 23: png_slots["p23"], 24: png_slots["p24"],
    25: pick_any("gift"), 26: pick_any("food"), 27: pick_any("drink"), 28: png_slots["p28"],
    29: pick_any("watch_band"), 30: pick_any("food"), 31: pick_any("headphone"), 32: pick_any("office"),
    33: pick_any("beauty"), 34: png_slots["p34"], 35: pick_any("beauty"), 36: pick_any("fashion"),
    37: pick_any("home"), 38: pick_any("sport"), 39: pick_any("office"), 40: pick_any("watch_band"),
    41: pick_any("power"), 42: pick_any("laptop"), 43: pick_any("tool"), 44: pick_any("fashion"),
    45: pick_any("food"), 46: pick_any("food"), 47: pick_any("food"), 48: pick_any("watch_band"),
    49: pick_any("misc"), 50: pick_any("misc"), 51: pick_any("gift"), 52: pick_any("food"),
    53: pick_any("headphone"), 54: pick_any("beauty"), 55: png_slots["p55"], 56: png_slots["p56"],
    57: pick_any("watch_band"),
}
for i, f in p_map.items():
    key = f"p{i}"
    if key not in assign:
        assign[key] = f
        used_files.add(f)

cat_order = ["office", "beauty", "food", "drink", "home", "fashion", "sport", "headphone", "watch_band", "tool", "gift", "misc"]
for i in range(1, 49):
    assign[f"e{i}"] = pick_any(cat_order[(i - 1) % len(cat_order)])

vals = list(assign.values())
if len(vals) != len(set(vals)):
    from collections import Counter
    dups = [v for v, c in Counter(vals).items() if c > 1]
    raise SystemExit(f"duplicate files: {dups[:10]}")

out = Path(__file__).resolve().parent / "product-images.js"
named = ["watch", "headphone", "sneaker", "cake", "tshirt", "skincare", "cinema", "chair", "pumpkin", "shirt", "bags", "sale", "pants", "pen", "camera", "money", "cakeBirthday", "cakeCupcake"]
lines = [
    "const IMG_BASE = 'assets/products/';",
    "",
    "const IMG_FILES = " + json.dumps(assign, ensure_ascii=False, indent=2) + ";",
    "",
    "function imgFile(key) {",
    "  return IMG_BASE + IMG_FILES[key];",
    "}",
    "",
    "const IMG = {",
    "  oppo: IMG_BASE + IMG_FILES.oppo",
    "};",
    "",
]
for k in named:
    lines.append(f"IMG.{k} = imgFile('{k}');")
lines.append("")
for i in range(1, 58):
    lines.append(f"IMG.p{i} = imgFile('p{i}');")
for i in range(1, 49):
    lines.append(f"IMG.e{i} = imgFile('e{i}');")
lines += [
    "",
    "const IMG_POOL = Object.values(IMG_FILES).map(f => IMG_BASE + f);",
    "",
    "function poolImg(i) {",
    "  return IMG_POOL[i % IMG_POOL.length];",
    "}",
    "",
]
out.write_text("\n".join(lines), encoding="utf-8")
print(f"written {out.name}, keys={len(assign)}, unique={len(set(vals))}")
