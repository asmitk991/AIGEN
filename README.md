# AIGEN — AI Content Studio ✨

A full-stack AI-powered content generation platform built with **React, Express, and Google Gemini 2.5 Flash**.  
Generate high-quality blog posts, tweets, LinkedIn posts, and professional emails in seconds.

---

## 🚀 Live Demo

- **Frontend:** aigendev-27awicyl5-asmitk991s-projects.vercel.app 


---

## ✨ Features

- 🧠 **Gemini 2.5 Flash Integration** — fast and intelligent AI content generation  
- 📝 **Multiple Content Types** — Blog Posts, Tweets, LinkedIn Posts, Emails  
- 🎨 **Modern UI** — pastel glassmorphism design with smooth animations  
- 📦 **Local History** — stores generated content in browser localStorage  
- 📋 **Copy & Download** — export generated content instantly  
- 📱 **Responsive Design** — optimized for mobile and desktop  

---

## 🛠️ Tech Stack

| Layer       | Technology                          |
|------------|------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS       |
| Backend     | Node.js, Express                   |
| AI Engine   | Google Gemini 2.5 Flash            |
| Deployment  | Vercel (Frontend), Render (Backend)|
| Storage     | Browser localStorage               |

---

## 📁 Project Structure


AIGEN/
├── frontend/ # React + Vite app
│ ├── src/
│ │ ├── components/
│ │ │ ├── ContentForm.jsx
│ │ │ ├── ContentDisplay.jsx
│ │ │ └── HistoryPanel.jsx
│ │ ├── hooks/
│ │ │ └── useHistory.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
└── backend/ # Express API
├── server.js
└── package.json


---

## ⚙️ Local Setup

### Prerequisites
- Node.js (v18 or higher)
- Google AI Studio API Key

---

### 1. Clone the Repository

```bash
git clone https://github.com/asmitk991/AIGEN.git
cd AIGEN
2. Setup Backend
cd backend
npm install

Create a .env file inside backend/:

GEMINI_API_KEY=your_api_key_here
PORT=5001
FRONTEND_URL=http://localhost:5173

Start backend server:

npm run dev
3. Setup Frontend
cd ../frontend
npm install

Create a .env file inside frontend/:

VITE_API_URL=http://localhost:5001/api

Start frontend:

npm run dev

Open: http://localhost:5173

🌐 Deployment
Frontend (Vercel)
Root Directory: frontend
Build Command: npm run build
Output Directory: dist

Environment Variable:

VITE_API_URL=https://your-render-url.onrender.com/api
Backend (Render)
Root Directory: backend
Build Command: npm install
Start Command: node server.js

Environment Variables:

GEMINI_API_KEY=your_api_key
PORT=5001
FRONTEND_URL=https://your-vercel-url.vercel.app
📄 License

MIT License — free to use and modify.

👨‍💻 Author

Asmit Kumar

⚡ Notes
Ensure your API key has sufficient quota enabled
.env files are excluded via .gitignore for security
Designed for scalability and easy extension with additional AI providers

Made with ❤️
