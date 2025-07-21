# 🚀 Perceive Now - Full Stack Engineer Round 2 Submission

> **Title**: “Make Intelligence Feel Inevitable.”

Welcome to my submission for the Full Stack Engineer challenge at Perceive Now.  
This project simulates a report viewer interface that blends explainability, traceability, and user intuition.

---

## 🧠 Project Overview

This is a full-stack prototype designed to reflect Perceive Now's vision of decision intelligence, not dashboards.

### 👨‍💻 Built With:
- **Frontend**: React (CRA) + Tailwind CSS
- **Backend**: Node.js + Express
- **UX Features**:
  - Report browsing and filtering
  - Slide-out summary panel
  - Animated Confidence Meter (0–100%)
  - Expandable source trace cards ("Why We Trust This")
  - Feedback form
  - Dark mode with Perceive Now’s palette

---

## 🖥️ Live Demo & Video

- **Frontend**: [🔗 Vercel Link]([https://your-frontend-link.vercel.app)](https://perceive-now-eight.vercel.app/)
- **Backend**: [🔗 Render Link][(https://your-backend-link.onrender.com)](https://perceive-now.onrender.com)
- **Loom Walkthrough**: [🎥 Watch the Demo][(https://www.loom.com/share/your-video-link)](https://www.loom.com/share/c362352f26cc4ad49d83e1ccab6c15cc?sid=029e6870-ec8e-42f7-9ae3-f3870bfd5d88)

---

## 🛠️ How to Run Locally

### 📦 Backend (Node.js)
```bash
cd server
npm install
node server.js

Runs on: http://localhost:5000

🎨 Frontend (React)
cd client
npm install
npm start
Runs on: http://localhost:3000

🔌 API Endpoints
GET /reports
Returns list of synthetic reports:

json

[
  {
    "id": "1",
    "title": "Market Trends",
    "confidenceScore": 87,
    ...
  }
]
POST /feedback
Accepts:

json

{
  "reportId": "1",
  "userComment": "Great report!",
  "flaggedSection": "Summary"
}
✨ Features in Action
🔍 Filter by industry, confidenceScore, reportType

📄 Slide panel shows summary, confidence meter, sources

🎯 Animated confidence progress bar

🧾 Feedback form (connected to backend)

🌓 Dark mode toggle (#3F1470, #FFA301)
