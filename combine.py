import json
import os
from collections import defaultdict

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

chapters_path = os.path.join(DATA_DIR, "chapters.json")
verses_path = os.path.join(DATA_DIR, "verses.json")
output_path = os.path.join(DATA_DIR, "gita.comic.json")

# Load chapters
with open(chapters_path, "r", encoding="utf-8") as f:
    chapters_data = json.load(f)

# Create chapter_number -> English name map
chapter_name_map = {
    c["chapter_number"]: c.get("name_translation", "Unknown Chapter")
    for c in chapters_data
}

# Load verses
with open(verses_path, "r", encoding="utf-8") as f:
    verses_data = json.load(f)

# Group verses by chapter
chapters = defaultdict(list)

for v in verses_data:
    chapter_num = v["chapter_number"]

    verse_obj = {
        "verse": v["verse_number"],
        "sanskrit": v["text"].strip(),
        "comic_meaning": v.get("word_meanings", "").strip(),
        "scene_hint": "Krishna and Arjuna on the battlefield"
    }

    chapters[chapter_num].append(verse_obj)

# Build final structure
final_output = []

for chapter_num in sorted(chapters.keys()):
    final_output.append({
        "chapter": chapter_num,
        "chapter_name": chapter_name_map.get(chapter_num, "Unknown Chapter"),
        "verses": chapters[chapter_num]
    })

# Write output
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(final_output, f, ensure_ascii=False, indent=2)

print("✅ gita.comic.json generated in comic-friendly format!")
