from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
import pdfplumber
import io

app = FastAPI()

# 🛑 ERROR FIX: This allows your Next.js app to talk to your API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model globally so it only loads once (saves memory)
model = SentenceTransformer('all-MiniLM-L6-v2')

@app.post("/analyze")
async def analyze_resume(file: UploadFile = File(...)):
    try:
        # 1. Read PDF
        request_object_content = await file.read()
        with pdfplumber.open(io.BytesIO(request_object_content)) as pdf:
            text = " ".join([page.extract_text() for page in pdf.pages if page.extract_text()])

        # 2. Mock Job Description (In production, this comes from your DB)
        jd_text = "Looking for a developer skilled in Python, FastAPI, and React."

        # 3. BERT Vectorize & Match
        resume_vec = model.encode(text)
        jd_vec = model.encode(jd_text)
        
        from sklearn.metrics.pairwise import cosine_similarity
        score = cosine_similarity([resume_vec], [jd_vec])[0][0]

        return {
            "status": "success",
            "match_score": round(float(score) * 100, 2),
            "audit_log": f"BERT Similarity calculated: {score:.4f}",
            "extracted_text_preview": text[:100] + "..."
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}