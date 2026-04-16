import json

with open("data/verses.json", "r", encoding="utf-8") as f:
    data = json.load(f)

processed = []

for v in data:
    combined_text = f"""
Chapter {v['chapter_number']} Verse {v['verse_number']}

Sanskrit:
{v['text']}

Meaning:
{v['word_meanings']}
"""

    processed.append({
        "id": f"{v['chapter_number']}.{v['verse_number']}",
        "chapter": v["chapter_number"],
        "verse": v["verse_number"],
        "combined_text": combined_text.strip()
    })

with open("gita_processed.json", "w", encoding="utf-8") as f:
    json.dump(processed, f, indent=2, ensure_ascii=False)

print("✅ Processed data saved")