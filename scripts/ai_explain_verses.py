import json
from tqdm import tqdm
from google import genai

# 🔑 Gemini client
client = genai.Client(api_key="AIzaSyB__mLsBdQzZkwnAs2aWrx6bjGJ1QV0MZc")

# ✅ THIS MODEL WORKS
MODEL = "gemini-2.5-flash"

INPUT_FILE = r"C:\Gita New Project\gita-comic\data\gita.comic.json"
OUTPUT_FILE = r"C:\Gita New Project\gita-comic\data\gita.comic.enriched.json"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    chapters = json.load(f)

def needs_ai_explanation(text):
    if not text:
        return True
    if "—" in text or ";" in text:
        return True
    if any(ch in text for ch in ["ṛ", "ṣ", "ā", "ḥ", "ṁ"]):
        return True
    return False

def explain_verse(sanskrit):
    prompt = f"""
Explain the following Bhagavad Gita verse in very simple English.

Rules:
- This is NOT a literal translation
- Explain the core idea only
- Write for a 12–15 year old
- Avoid religious or philosophical jargon
- Keep it under 2 sentences

Verse:
{sanskrit}
"""
    response = client.models.generate_content(
        model=MODEL,
        contents=prompt
    )
    return response.text.strip()

for chapter in tqdm(chapters, desc="Chapters"):
    for verse in chapter["verses"]:
        if not needs_ai_explanation(verse.get("comic_meaning", "")):
            continue

        print(f"➡️ Chapter {chapter['chapter']} Verse {verse['verse']}")
        verse["comic_meaning"] = explain_verse(verse["sanskrit"])

    # 💾 Save after each chapter
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(chapters, f, ensure_ascii=False, indent=2)

print("✅ Gemini explanations generated successfully.")
