from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
import pdfplumber
import io
from pydantic import BaseModel

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

# Simple in-memory store for approved companies (demo only)
companies = [
    {"name": "Initech", "approved": True},
    {"name": "Acme Corp", "approved": False},
]


class CompanyApproval(BaseModel):
    name: str
    approved: bool


class SelectionEmail(BaseModel):
    student_name: str
    student_email: str
    company_name: str
    job_title: str


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


@app.post("/approve-company")
async def approve_company(payload: CompanyApproval):
    try:
        # update existing company or append
        for c in companies:
            if c.get("name") == payload.name:
                c["approved"] = payload.approved
                break
        else:
            companies.append({"name": payload.name, "approved": payload.approved})

        return {"status": "success", "company": {"name": payload.name, "approved": payload.approved}}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.post("/send-selection-email")
async def send_selection_email(payload: SelectionEmail):
    try:
        # Mock email sending (in production, use SMTP/SendGrid)
        email_subject = f"Congratulations! {payload.student_name} Selected for {payload.job_title}"
        email_body = f"""
Dear {payload.company_name},

We are excited to inform you that {payload.student_name} ({payload.student_email}) has been selected for the position of {payload.job_title}.

Please proceed with the next steps in the hiring process.

Best regards,
AI Placement ERP
"""
        
        # In production, send via SMTP/SendGrid here
        # For now, we'll log it
        print(f"[EMAIL] To: company@{payload.company_name.lower()}.com | Subject: {email_subject}")
        
        return {
            "status": "success",
            "message": f"Selection email sent to {payload.company_name} for {payload.student_name}",
            "email_preview": email_body
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}