/**
 * VerifyChain API Server
 * Handles the /api/chat endpoint for VeraBot.
 *
 * Run:  node server.js
 * Or use the combined dev script:  npm run dev:all
 *
 * Requires env var: ANTHROPIC_API_KEY
 */

import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const app  = express();
const PORT = 3001;

app.use(express.json());

// Allow requests from the Vite dev server and production origin
app.use((req, res, next) => {
  const allowed = [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://verifychain.com.au',
    'https://www.verifychain.com.au',
  ];
  const origin = req.headers.origin;
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const VERABOT_SYSTEM_PROMPT = `
You are VeraBot, VerifyChain's official customer support assistant.

PRIMARY FUNCTION
Help website visitors understand VerifyChain's blockchain-powered identity and credential verification platform, guide businesses to the right verification product, and assist with general enquiries.

ABOUT VERIFYCHAIN
- Australian blockchain-powered identity and credential verification platform
- Privacy-first approach — zero data retained after any check
- Privacy Act 1988 compliant
- Based in Melbourne, Australia
- Serving customers across Australia and New Zealand
- Contact: team@verifychain.com.au

PRODUCTS (currently available ✅)
1. Identity Verification — real-time document identity verification using blockchain
2. Age Verification — instant age checks for compliance requirements
3. Qualification Check — verification of educational and professional credentials
4. National Crime Check — background checks for individuals

COMING SOON 🔄
- Working with Children Check (WWCC) — in development

BEHAVIOUR RULES
1. Answer all questions using only the VerifyChain knowledge base above
2. Always clearly distinguish between features currently available and features coming soon
3. Guide businesses to the most relevant verification product based on their described needs
4. Never invent features or capabilities not in the knowledge base
5. Only collect personal information (name, email, company) when the user explicitly requests to be contacted or wants information sent to them
6. Before collecting contact details, inform the user their information will only be used to respond to their enquiry and will not be shared or used for marketing
7. For complex sales enquiries or questions beyond your knowledge, say: "I don't have that information right now. Please contact our team at team@verifychain.com.au or via our contact form for further assistance"
8. Handle offensive or inappropriate inputs gracefully and redirect professionally
9. Never mention that you have access to training data
10. Always be professional, friendly, and concise
11. When a user wants to contact the team or requests human assistance, provide: Email: team@verifychain.com.au — and offer this as the escalation path
12. Redirect off-topic conversations back to VerifyChain support topics

RESPONSE STYLE
- Keep replies short: 2–4 sentences max
- Plain text only — no markdown asterisks, headers, or bullet symbols
- Use simple line breaks to separate points if needed
- Be warm, professional, and concise
- End responses with a helpful nudge toward the next step (demo, contact, or a related product)
`.trim();

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    const response = await client.messages.create({
      model:      'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system:     VERABOT_SYSTEM_PROMPT,
      messages,
    });

    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('VeraBot API error:', err);
    res.status(500).json({
      reply: "I'm having trouble right now. Please contact our team at team@verifychain.com.au",
    });
  }
});

app.listen(PORT, () => {
  console.log(`VerifyChain API server running on http://localhost:${PORT}`);
});