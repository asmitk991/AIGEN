# AIGEN — AI Content Studio ✨

A full-stack AI-powered content generation app built with **React**, **Express**, and **Google Gemini 2.5 Flash**. Generate blog posts, tweets, LinkedIn posts, and professional emails in seconds.

![AIGEN](https://img.shields.io/badge/AIGEN-Content%20Studio-7c3aed?style=for-the-badge)
![Gemini](https://img.shields.io/badge/Powered%20by-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)

---

## Live Demo

- **Frontend:** [https://aigendev-27awicyl5-asmitk991s-projects.vercel.app](https://aigendev.vercel.app/)


---

## Features

- Gemini 2.5 Flash — cutting-edge AI generation with smart fallback
- 4 Content Types — Blog Posts, Tweets, LinkedIn Posts, Emails
- Aesthetic Pastel UI — glassmorphism design with smooth animations
- Local History — all past generations saved to browser localStorage
- Copy and Download — export any generated content instantly
- Fully Responsive — works beautifully on mobile and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| AI Engine | Google Gemini 2.5 Flash |
| Deployment | Vercel (frontend), Render (backend) |
| Storage | Browser localStorage |

---

## Project Structure

```
AIGEN/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContentForm.jsx
│   │   │   ├── ContentDisplay.jsx
│   │   │   └── HistoryPanel.jsx
│   │   ├── hooks/
│   │   │   └── useHistory.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── backend/
    ├── server.js
    └── package.json
```

---

## Local Setup

### Prerequisites

- Node.js v18+
- A free Google AI Studio API key from https://aistudio.google.com/

### 1. Clone the repo

```bash
git clone https://github.com/asmitk991/AIGEN.git
cd AIGEN
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```
GEMINI_API_KEY=your_api_key_here
PORT=5001
FRONTEND_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:

```
VITE_API_URL=http://localhost:5001/api
```

Start the app:

```bash
npm run dev
```

Open http://localhost:5173

---

## Deployment

### Frontend on Vercel

1. Import your GitHub repo on vercel.com
2. Set Root Directory to `frontend`
3. Set Build Command to `npm run build`
4. Set Output Directory to `dist`
5. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com/api`

### Backend on Render

1. Create a new Web Service on render.com
2. Set Root Directory to `backend`
3. Set Build Command to `npm install`
4. Set Start Command to `node server.js`
5. Add environment variables:

```
GEMINI_API_KEY=your_api_key_here
PORT=5001
FRONTEND_URL=https://your-vercel-app.vercel.app
```

---

## License

MIT — free to use and modify.

---

Made with love by Asmit Kumar — https://github.com/asmitk991
