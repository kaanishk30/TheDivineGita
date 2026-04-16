from sentence_transformers import SentenceTransformer
import faiss
import json
import numpy as np

# Load model
model = SentenceTransformer("BAAI/bge-small-en")

# Load data
with open("gita_processed.json", "r", encoding="utf-8") as f:
    data = json.load(f)

texts = [d["combined_text"] for d in data]

# Convert to embeddings
embeddings = model.encode(texts)

# Create FAISS index
dim = embeddings.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(np.array(embeddings))

# Save
faiss.write_index(index, "gita.faiss")

with open("texts.json", "w", encoding="utf-8") as f:
    json.dump(texts, f)

print("✅ FAISS index created")