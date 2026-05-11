
# 🎓 AI-Integrated Student Campus Placement Management

> A smart, AI-powered platform to streamline student campus placements — from profile management to company matching and interview preparation.

---

## 📌 Overview

The **AI-Integrated Student Campus Placement Management** system is a full-stack web application designed to modernize and automate the campus placement process. It bridges the gap between students, placement officers, and recruiters by leveraging AI to provide intelligent insights, resume analysis, and job-matching capabilities.

Built as part of a hackathon project (**Protothon**), this platform focuses on delivering a seamless placement experience for engineering colleges and universities.

---

## ✨ Features

- 🤖 **AI-Powered Resume Analysis** — Automatically parses and evaluates student resumes for key skills and experience.
- 🎯 **Smart Job Matching** — Matches student profiles with the most relevant job openings using AI recommendations.
- 📋 **Student Profile Management** — Students can manage their academic details, projects, skills, and certifications.
- 🏢 **Company & Drive Management** — Admins can register companies and schedule placement drives.
- 📊 **Placement Analytics Dashboard** — Visual insights on placement statistics, company visits, and student performance.
- 🔔 **Notifications & Updates** — Real-time alerts for upcoming drives, results, and deadlines.
- 🔐 **Role-Based Access** — Separate dashboards for Students, Placement Officers, and Recruiters.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | TypeScript, React, CSS |
| **Backend** | Python |
| **Styling** | CSS (14.6%) |
| **Build Tool** | Node.js / npm |
| **Language Breakdown** | TypeScript (62.4%), Python (11%), HTML (6.1%), JS (5.9%) |

---

## 📁 Project Structure

```
AI-Integrated-Student-Campus-Placement-Management/
│
├── protothon/             # Main application source code
│   ├── src/               # Frontend React/TypeScript source
│   ├── backend/           # Python AI & API backend
│   └── public/            # Static assets
│
├── node_modules/          # Node.js dependencies
├── package.json           # Project metadata and dependencies
└── package-lock.json      # Locked dependency versions
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.9 or higher)
- npm (comes with Node.js)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/THANUSHREE-Codes/AI-Integrated-Student-Campus-Placement-Management.git
cd AI-Integrated-Student-Campus-Placement-Management
```

**2. Install frontend dependencies**

```bash
npm install
```

**3. Install Python backend dependencies**

```bash
cd protothon/backend
pip install -r requirements.txt
```

### Running the Application

**Start the Python backend:**

```bash
cd protothon/backend
python app.py
```

**Start the frontend (in a new terminal):**

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`

---

## 👥 User Roles

### 🎓 Student
- Register and build a placement profile
- Upload resume for AI analysis
- Browse and apply to placement drives
- Track application status and interview schedules

### 🏫 Placement Officer
- Manage student records and placement drives
- Invite companies and coordinate scheduling
- View placement analytics and export reports

### 🏢 Recruiter / Company
- Post job openings and requirements
- View AI-matched student profiles
- Schedule interviews and post results

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add: your feature description"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate comments.

---

## 📄 License

This project is open-source. Feel free to use, modify, and distribute it with attribution.

---

## 🙌 Acknowledgements

- Built with ❤️ for **Protothon Hackathon**
- Inspired by the challenges faced in college campus placements across India
- Thanks to all contributors and mentors who supported this project

---

> **"Connecting students to opportunities, intelligently."**