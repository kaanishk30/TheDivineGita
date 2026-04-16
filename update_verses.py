import csv
import json

json_path = r"c:\Gita New Project\gita-comic\data\verses.json"
csv_path = r"c:\Gita New Project\gita-comic\Bhagwad_Gita.csv"

def main():
    print("Reading verses.json...")
    with open(json_path, 'r', encoding='utf-8') as f:
        verses = json.load(f)

    print("Reading Bhagwad_Gita.csv...")
    csv_dict = {}
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                chap = int(row['Chapter'])
                verse = int(row['Verse'])
                csv_dict[(chap, verse)] = row
            except ValueError:
                pass
                
    print(f"Loaded {len(csv_dict)} verses from CSV.")
    
    updated_count = 0
    for v in verses:
        key = (v.get('chapter_number'), v.get('verse_number'))
        if key in csv_dict:
            row = csv_dict[key]
            
            # Extract everything relevant 
            v['english_meaning'] = row.get('EngMeaning', '').strip()
            v['hindi_meaning'] = row.get('HinMeaning', '').strip()
            v['csv_word_meaning'] = row.get('WordMeaning', '').strip()
            v['csv_shloka'] = row.get('Shloka', '').strip()
            
            # Accommodate the request: "i want the word_meanings in this json file to be the meaning of the verse in english"
            # Preserving the original word meanings just in case they are valuable
            if 'word_meanings' in v and 'original_word_meanings' not in v:
                v['original_word_meanings'] = v['word_meanings']
            
            # Set word_meanings to English meaning
            v['word_meanings'] = row.get('EngMeaning', '').strip()
            
            updated_count += 1
            
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(verses, f, ensure_ascii=False, indent=2)

    print(f"Updated {updated_count} elements in verses.json successfully.")

if __name__ == "__main__":
    main()
