const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // Correct way to list models in the new SDK
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    
    if (data.error) {
      console.error('API Error:', data.error);
      return;
    }

    console.log('--- YOUR AVAILABLE MODELS ---');
    data.models.forEach((model) => {
      console.log(`- ${model.name.replace('models/', '')} (${model.displayName})`);
    });
    console.log('----------------------------');
  } catch (error) {
    console.error('Failed to fetch models:', error);
  }
}

listModels();
