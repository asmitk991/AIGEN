# AI Content Generator Studio

A full-stack AI-powered content generation application built with React, Express, and OpenAI.

## Features

- **Multi-platform Content**: Generate blogs, tweets, LinkedIn posts, and emails.
- **Targeted Audience**: 7 predefined audience segments.
- **Tone Control**: Choose from 6 different tones for your content.
- **Persistent History**: Your generations are saved locally in the browser (up to 50 items).
- **Copy & Download**: Easy tools to copy content or download as .txt files.
- **Modern UI**: Clean, glassmorphism-inspired design with smooth animations.
- **Mobile Responsive**: Fully adaptive layout for all screen sizes.

## Project Structure

```
/
├── backend/            # Express server
│   ├── server.js      # Main API logic
│   └── .env           # OpenAI API key & configuration
└── frontend/           # React + Vite + Tailwind
    ├── src/
    │   ├── components/ # UI Components
    │   ├── hooks/      # Custom React hooks
    │   └── App.jsx     # Main application Logic
    └── .env           # API URL configuration
```

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, OpenAI SDK, Dotenv, CORS
- **Storage**: Browser LocalStorage (no database required)
- **AI**: OpenAI GPT-3.5 Turbo
