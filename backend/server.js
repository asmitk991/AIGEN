const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow any vercel.app subdomain
    if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS blocked: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());
app.use(bodyParser.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Content generation endpoint
app.post('/api/generate', async (req, res) => {
  const { topic, audience, contentType, tone } = req.body;

  // Validation
  if (!topic || !audience || !contentType || !tone) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: topic, audience, contentType, tone'
    });
  }

  // Optimized prompts
  let userPrompt = "";

  switch (contentType) {
    case 'blog':
      userPrompt = `Write a comprehensive, professional, 800-1000 word blog post about "${topic}" intended for a "${audience}" audience. Use an "${tone}" tone. Include an introduction, 3-4 distinct sections with subheadings, and a concluding summary. Wrap the content in appropriate structure (no markdown code blocks, just plain text with clear headings).`;
      break;
    case 'tweet':
      userPrompt = `Write 5 engaging tweets about "${topic}" for "${audience}". Tone: "${tone}". Each tweet must be under 280 characters and include relevant hashtags. Format them as a numbered list.`;
      break;
    case 'linkedin':
      userPrompt = `Write a professional LinkedIn post about "${topic}" for "${audience}". Tone: "${tone}". Keep it between 150-300 words, highly engaging, and include a clear call to action (CTA).`;
      break;
    case 'email':
      userPrompt = `Write a professional email about "${topic}" for "${audience}". Tone: "${tone}". Structure the response with: "Subject: [subject lane]", "Greeting", "Body Content", and "CTA".`;
      break;
    default:
      return res.status(400).json({ success: false, message: 'Invalid contentType' });
  }

  try {
    // Attempting with the most common model name
    let generatedContent = "";

    try {
      // Trying the standard flash model
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      generatedContent = response.text();
    } catch (innerError) {
      console.warn("Primary model attempt failed:", innerError.message);

      // Fallback to "gemini-pro"
      console.warn("Attempting fallback to gemini-1.5-pro...");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(userPrompt);
      const response = await result.response;
      generatedContent = response.text();
    }

    res.json({
      success: true,
      data: {
        topic,
        audience,
        contentType,
        tone,
        generatedContent,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Gemini Error:', error);

    // Check for Rate Limit (429) or Quota issues (limit 0)
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      return res.status(429).json({
        success: false,
        message: 'AI Quota exceeded or Rate limit reached. If this is a new key, please wait 5 minutes for it to activate, or check your Google AI Studio dashboard.'
      });
    }

    // Check for API key issues
    if (error.message && (error.message.includes('API key') || error.status === 401)) {
      return res.status(401).json({ success: false, message: 'Invalid API key provided' });
    }

    // Check for safety/content issues
    if (error.message && error.message.includes('safety')) {
      return res.status(400).json({ success: false, message: 'Content generation was blocked due to safety guidelines.' });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error while generating content'
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`AI Engine: Google Gemini 2.5 Flash/Pro`);
});
