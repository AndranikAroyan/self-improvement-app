// src/groq.js
import { Groq } from 'groq-sdk'; // Import the Groq SDK

// Initialize the Groq client with your API key
const groq = new Groq({
  apiKey: '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', // Replace with your actual API key
  dangerouslyAllowBrowser: true,
});

export default groq;
