"""Katalog taraması v2 çıktısını işler: eşleşmiş örneklerde bizim kataloğumuzda olmayan anahtarları (yeni GHL metinleri)
örnek adına göre toplar; eşleşmemiş örnekleri raporlar. Kullanım: python3 sweep-process.py out.json gai-crm-newcats2-*.json"""
import json, os, re, sys

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "source") + "/"
en = json.load(open(SRC + "crm-en.flat.json"))
tr = json.load(open(SRC + "crm-tr.flat.json"))
ik = json.load(open(SRC + "instance-keys.json"))
have = {}
for k in en:
    inst, _, key = k.partition("::")
    have.setdefault(inst, set()).add(key)
shell_top = set(k.split(".")[0] for k in have.get("shell", ()))

def pick(root, top):
    top = [t for t in top if t != "__gai_probe__"]
    if root == "app":
        return "shell", ""
    best, score = None, 0
    for inst, keys in ik.items():
        if inst == "shell":
            continue
        s = set(keys)
        hit = sum(1 for t in top if t in s)
        sc = hit / max(len(s), len(top), 1)
        if sc > score:
            best, score = inst, sc
    if score >= 0.6:
        return best, ""
    # ana kataloğun bir bölümü (alt uygulama kendi örneğini o bölümle kurmuş): bölüm yolunu bul
    if all(t in shell_top for t in top):
        return "shell", ""
    sig = set(top)
    sub = {}
    for k in have.get("shell", ()):
        parts = k.split(".")
        for d in range(1, min(4, len(parts) - 1)):
            sub.setdefault(".".join(parts[:d]), set()).add(parts[d])
    bestp, bs = None, 0
    for pref, kids in sub.items():
        hit = len(sig & kids)
        sc = hit / max(len(sig), 1)
        if sc > bs:
            bestp, bs = pref, sc
    if bs >= 0.8:
        return "shell", bestp + "."
    return None, ""

NOISE = re.compile(r"^(https?://\S+|[\w.-]+@[\w.-]+|[#\d\s.,:%/+\-()]+|[A-Z0-9_]+|[a-z0-9_.-]+)$")

def main():
    out_path, files = sys.argv[1], sys.argv[2:]
    found, unpatched, unknown = {}, {}, []
    for f in files:
        d = json.load(open(f))
        cats = d.get("cats", d)
        for sig, c in cats.items():
            root, top, miss = c.get("root", ""), c.get("top", []), c.get("miss", {})
            if not c.get("patched"):
                unpatched[sig] = {"root": root, "n": len(miss), "paths": c.get("paths", [])[:3],
                                  "turkish_ratio": round(sum(1 for v in miss.values() if re.search(r"[çğıöşüÇĞİÖŞÜ]", str(v))) / max(len(miss), 1), 2),
                                  "sample": dict(list(miss.items())[:5])}
                continue
            inst, pref = pick(root, top)
            if not inst:
                unknown.append({"sig": sig[:90], "n": len(miss), "paths": c.get("paths", [])[:2]})
                continue
            for k, v in miss.items():
                if k == "__gai_probe__" or not isinstance(v, str):
                    continue
                full = pref + k
                if full in have.get(inst, ()):  # bizde var (aynı-İngilizce atlanmış ya da derlenemedi)
                    continue
                vv = v.strip()
                if not vv or NOISE.match(vv) or not re.search(r"[A-Za-z]{2}", vv):
                    continue
                found.setdefault(inst, {})[full] = v
    json.dump({"found": found, "unpatched": unpatched, "unknown": unknown}, open(out_path, "w"), ensure_ascii=False, indent=1)
    print({k: len(v) for k, v in found.items()}, "unpatched", len(unpatched), "unknown", len(unknown))
    for s, u in unpatched.items():
        print("U", s[:80], u["n"], "tr_ratio", u["turkish_ratio"], u["paths"][:1])
    for u in unknown:
        print("?", u)

main()
