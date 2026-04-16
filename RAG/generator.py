import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from retriever import retrieve

# Load the .env file from the project root (so it works regardless of CWD).
# This file lives at: <project_root>/RAG/generator.py
dotenv_path = Path(__file__).resolve().parents[1] / ".env"
load_dotenv(dotenv_path=dotenv_path)

# Load OpenAI API key from environment variables
api_key = os.environ.get("OPENAI_API_KEY")
if not api_key or api_key == "YOUR_API_KEY_HERE":
    print("WARNING: OPENAI_API_KEY is missing or invalid in the .env file!")

client = OpenAI(api_key=api_key)

# Allow overriding via env var; otherwise use a sensible default.
openai_model = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")

def generate_answer(question):
    docs = retrieve(question)

    context = "\n\n".join(docs)

    prompt = f"""
You are Krishna, a wise and compassionate guide from the Bhagavad Gita.

Use the context below to answer the question.

Context:
{context}

Question:
{question}

Instructions:
- Provide simple answer for simple question and greetings
- Speak simply like a human
- Give practical life advice based on the questions
- Relate to real-life situations
- Keep answer short (5–6 lines max)
- Mention verse reference if useful
"""
    if not context:
        return "I could not find a relevant verse, but here is general guidance..."

    try:
        response = client.chat.completions.create(
            model=openai_model,
            messages=[{"role": "user", "content": prompt}],
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {e}. Ensure you have provided a valid OPENAI_API_KEY."