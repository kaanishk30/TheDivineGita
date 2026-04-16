from sentence_transformers import SentenceTransformer
import faiss, json, numpy as np

model = SentenceTransformer("BAAI/bge-small-en")

index = faiss.read_index("gita.faiss")

with open("texts.json", "r", encoding="utf-8") as f:
    texts = json.load(f)

def retrieve(query, k=2):
    q_emb = model.encode([query])
    D, I = index.search(np.array(q_emb), k)
    return [texts[i] for i in I[0]]