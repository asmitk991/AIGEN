markdown
# AIGEN — AI Content Studio ✨
A full-stack AI-powered content generation app built with **React**, **Express**, and **Google Gemini 2.5 Flash**. Generate blog posts, tweets, LinkedIn posts, and professional emails in seconds.
![AIGEN Banner](https://img.shields.io/badge/AIGEN-Content%20Studio-7c3aed?style=for-the-badge&logo=sparkles)
![Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
---
## 🚀 Live Demo
- **Frontend:** [aigen.vercel.app](https://aigendev-27awicyl5-asmitk991s-projects.vercel.app)
- **Backend API:** [aigen-p1k0.onrender.com](https://aigen-p1k0.onrender.com/api/health)
---
## ✨ Features
- 🧠 **Gemini 2.5 Flash** — cutting-edge AI generation with smart fallback
- 📝 **4 Content Types** — Blog Posts, Tweets, LinkedIn Posts, Emails
- 🎨 **Aesthetic Pastel UI** — glassmorphism design with smooth animations
- 📦 **Local History** — all past generations saved to browser `localStorage`
- 📋 **Copy & Download** — export any generated content instantly
- 📱 **Fully Responsive** — works beautifully on mobile and desktop
---
## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| AI Engine | Google Gemini 2.5 Flash |
| Deployment | Vercel (frontend), Render (backend) |
| Storage | Browser `localStorage` |
---
## 📁 Project Structure
AIGEN/ ├── frontend/ # React + Vite app │ ├── src/ │ │ ├── components/ │ │ │ ├── ContentForm.jsx │ │ │ ├── ContentDisplay.jsx │ │ │ └── HistoryPanel.jsx │ │ ├── hooks/ │ │ │ └── useHistory.js │ │ ├── App.jsx │ │ └── main.jsx │ └── package.json │ └── backend/ # Express API ├── server.js └── package.json

---
## ⚙️ Local Setup
### Prerequisites
- Node.js v18+
- A free [Google AI Studio](https://aistudio.google.com/) API key
### 1. Clone the repo
```bash
git clone https://github.com/asmitk991/AIGEN.git
cd AIGEN
2. Setup Backend
bash
cd backend
npm install
Create a .env file in the backend/ folder:

env
GEMINI_API_KEY=your_api_key_here
PORT=5001
FRONTEND_URL=http://localhost:5173
Start the backend:

bash
npm run dev
3. Setup Frontend
bash
cd ../frontend
npm install
Create a .env file in the frontend/ folder:

env
VITE_API_URL=http://localhost:5001/api
Start the frontend:

bash
npm run dev
Open http://localhost:5173 🎉

🌐 Deployment
Frontend → Vercel
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Environment Variable: VITE_API_URL=https://your-render-url.onrender.com/api
Backend → Render
Root Directory: backend
Build Command: npm install
Start Command: node server.js
Environment Variables: GEMINI_API_KEY, PORT=5001, FRONTEND_URL=https://your-vercel-url.vercel.app
📄 License
MIT — free to use and modify.

Made with ❤️ by Asmit Kumar

