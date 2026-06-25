import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Verabot.module.css';

// ── EmailJS config (same as ContactPage) ─────────────────────────────────────
const EMAILJS_SERVICE_ID   = 'service_wof9sbb';
const EMAILJS_TEMPLATE_ID  = 'template_r8jkopj';   // notification to team
const EMAILJS_AUTOREPLY_ID = 'template_j2qzuuq';   // auto-reply to visitor
const EMAILJS_PUBLIC_KEY   = 'V6Cz6xFQihHiqjre3';

// ── Zapier webhook — logs submissions to Google Sheet ─────────────────────────
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/27807649/4brg2az/';

// Quick-reply option labels shown as buttons
const OPTION_LABELS = {
  services:   '🔍 Our Verifications',
  demo:       '📅 Request a Demo',
  pricing:    '💰 Pricing',
  contact:    '✉️ Contact Team',
  identity:   '🪪 Identity Verification',
  age:        '🔞 Age Verification',
  quals:      '🎓 Qualification Check',
  crime:      '🔎 Crime Check',
  wwcc:       '👶 Working with Children',
};

// Initial quick reply options shown on load
const INITIAL_OPTIONS = ['services', 'demo', 'pricing', 'contact'];

// Service options shown when user asks about verifications
const SERVICE_OPTIONS = ['identity', 'age', 'quals', 'crime', 'wwcc'];

// Predefined fast responses for button clicks (avoids API call for simple routing)
const QUICK_RESPONSES = {
  services: "VerifyChain offers 5 core verification services:\n\n🪪 Identity Verification ✅\n🔞 Age Verification ✅\n🎓 Qualification Check ✅\n🔎 National Crime Check ✅\n👶 Working with Children Check 🔄 Coming Soon\n\nWhich one would you like to know more about?",
  pricing:  "VerifyChain offers flexible pricing tailored to your business size and verification volume. To get a personalised quote, you can request a demo or contact our team directly at team@verifychain.com.au 💼",
  demo:     null, // handled separately — triggers enquiry flow
  contact:  "You can reach the VerifyChain team at:\n\n✉️ team@verifychain.com.au\n\nOr request a demo via the button below and our sales team will be in touch within 6 hours 😊",
  identity: null, // let Claude handle detailed questions
  age:      null,
  quals:    null,
  crime:    null,
  wwcc:     null,
};

// Enquiry collection steps
const STEPS = ['name', 'email', 'company', 'message', 'sending', 'done'];

const STEP_PROMPTS = {
  name:    "Sure! Before I connect you with the team, what's your name?",
  email:   (name) => `Thanks ${name}! What's your work email address?`,
  company: (email) => `Got it! And what company are you from?`,
  message: "What would you like to discuss with the team? (or type \"skip\")",
};

export default function VeraBot() {
  const [open, setOpen]         = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "👋 Hi! I'm VeraBot, VerifyChain's virtual assistant." },
    { type: 'bot', text: "I can help you understand our verification services or connect you with our team. What can I help you with today?" },
  ]);
  const [options, setOptions]   = useState(INITIAL_OPTIONS);
  const [input, setInput]       = useState('');
  const [step, setStep]         = useState(null);
  const [enquiry, setEnquiry]   = useState({ name: '', email: '', company: '', message: '' });
  const [loading, setLoading]   = useState(false);
  const [history, setHistory]   = useState([]); // Claude conversation history
  const messagesEndRef           = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function addMsg(text, type) {
    setMessages(prev => [...prev, { text, type }]);
  }

  // ── Claude API call ─────────────────────────────────────────────────────────
  async function askClaude(userMessage) {
    const newHistory = [...history, { role: 'user', content: userMessage }];
    setHistory(newHistory);
    setLoading(true);
    setOptions([]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      });
      const data = await res.json();
      const reply = data.reply;

      setHistory(prev => [...prev, { role: 'assistant', content: reply }]);
      addMsg(reply, 'bot');
      setOptions(['services', 'demo', 'contact']);
    } catch {
      addMsg("Sorry, I'm having trouble right now. Please contact us at team@verifychain.com.au", 'bot');
      setOptions(INITIAL_OPTIONS);
    } finally {
      setLoading(false);
    }
  }

  // ── Quick reply option handler ───────────────────────────────────────────────
  function handleOption(key) {
    if (key === 'demo') { startEnquiry(); return; }
    if (key === 'services') {
      addMsg(OPTION_LABELS[key], 'user');
      setOptions([]);
      setTimeout(() => {
        addMsg(QUICK_RESPONSES.services, 'bot');
        setOptions(SERVICE_OPTIONS);
      }, 400);
      return;
    }

    // Has a quick response — no need for Claude
    if (QUICK_RESPONSES[key]) {
      addMsg(OPTION_LABELS[key], 'user');
      setOptions([]);
      setTimeout(() => {
        addMsg(QUICK_RESPONSES[key], 'bot');
        setOptions(['demo', 'contact', 'services']);
      }, 400);
      return;
    }

    // No quick response — ask Claude
    const label = OPTION_LABELS[key] || key;
    addMsg(label, 'user');
    askClaude(`Tell me about ${label} at VerifyChain`);
  }

  // ── Enquiry flow ─────────────────────────────────────────────────────────────
  function startEnquiry() {
    addMsg('Request a Demo', 'user');
    setOptions([]);
    setTimeout(() => {
      addMsg(
        '🔒 Just so you know — any details you share will only be used to respond to your enquiry. We will not share your information or use it for marketing.',
        'bot'
      );
      setTimeout(() => {
        setStep('name');
        addMsg(STEP_PROMPTS.name, 'bot');
      }, 600);
    }, 400);
  }

  async function submitEnquiry(finalEnquiry) {
    setStep('sending');
    addMsg('Sending your request...', 'bot');

    const templateParams = {
      from_name:    finalEnquiry.name,
      from_email:   finalEnquiry.email,
      email:        finalEnquiry.email,
      organisation: finalEnquiry.company || 'Not provided',
      role:         'Via VeraBot Chat',
      org_size:     'Not provided',
      inquiry_type: 'Demo Request (via VeraBot)',
      message:      finalEnquiry.message || 'No additional message.',
    };

    try {
      // 1. Notify the team
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // 2. Auto-reply to visitor
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_ID,
        {
          to_name:      finalEnquiry.name,
          to_email:     finalEnquiry.email,
          inquiry_type: 'Demo Request (via VeraBot)',
          organisation: finalEnquiry.company || 'Not provided',
          role:         'Not provided',
          message:      finalEnquiry.message || 'No additional message.',
        },
        EMAILJS_PUBLIC_KEY
      );

      // 3. Log to Google Sheet via Zapier (fire and forget)
      const zapData = new FormData();
      zapData.append('timestamp',    new Date().toLocaleString('en-AU'));
      zapData.append('name',         finalEnquiry.name);
      zapData.append('email',        finalEnquiry.email);
      zapData.append('organisation', finalEnquiry.company || '');
      zapData.append('role',         'Via VeraBot Chat');
      zapData.append('org_size',     '');
      zapData.append('inquiry_type', 'Demo Request (via VeraBot)');
      zapData.append('message',      finalEnquiry.message || '');
      zapData.append('status',       'Pending');
      fetch(ZAPIER_WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body: zapData })
        .catch(err => console.warn('Zapier log failed:', err));

      setStep('done');
      addMsg(`✅ Done! We'll be in touch at ${finalEnquiry.email} within 6 hours.`, 'bot');
      setOptions(['services', 'contact']);
      setEnquiry({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStep(null);
      addMsg('❌ Something went wrong. Please email us at team@verifychain.com.au or use the contact form.', 'bot');
      setOptions(INITIAL_OPTIONS);
    }
  }

  // ── Input handler ────────────────────────────────────────────────────────────
  function handleSend() {
    const val = input.trim();
    if (!val || loading) return;
    setInput('');

    // Enquiry step handling
    if (step === 'name') {
      addMsg(val, 'user');
      setEnquiry(prev => ({ ...prev, name: val }));
      setStep('email');
      setTimeout(() => addMsg(STEP_PROMPTS.email(val), 'bot'), 400);
      return;
    }
    if (step === 'email') {
      if (!/\S+@\S+\.\S+/.test(val)) {
        addMsg(val, 'user');
        setTimeout(() => addMsg("That doesn't look like a valid email. Could you try again?", 'bot'), 400);
        return;
      }
      addMsg(val, 'user');
      setEnquiry(prev => ({ ...prev, email: val }));
      setStep('company');
      setTimeout(() => addMsg(STEP_PROMPTS.company(val), 'bot'), 400);
      return;
    }
    if (step === 'company') {
      addMsg(val, 'user');
      setEnquiry(prev => ({ ...prev, company: val }));
      setStep('message');
      setTimeout(() => addMsg(STEP_PROMPTS.message, 'bot'), 400);
      return;
    }
    if (step === 'message') {
      addMsg(val, 'user');
      const msg = val.toLowerCase() === 'skip' ? '' : val;
      const final = { ...enquiry, message: msg };
      setEnquiry(final);
      setOptions([]);
      setTimeout(() => submitEnquiry(final), 400);
      return;
    }

    // Free text — send to Claude
    addMsg(val, 'user');
    askClaude(val);
  }

  return (
    <>
      {/* Chat trigger button */}
      <button className={styles.trigger} onClick={() => setOpen(o => !o)} title="Chat with VeraBot">
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className={styles.window}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.avatar}>V</div>
            <div>
              <h4>VeraBot</h4>
              <p>VerifyChain Assistant</p>
            </div>
            <div className={styles.status}>● Online</div>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.type === 'user' ? styles.user : styles.bot}`}>
                {m.text.split('\n').map((line, j) => (
                  <span key={j}>{line}<br /></span>
                ))}
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className={`${styles.msg} ${styles.bot} ${styles.typing}`}>
                <span>●</span><span>●</span><span>●</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply buttons */}
          {options.length > 0 && !loading && (
            <div className={styles.options}>
              {options.map(k => (
                <button key={k} className={styles.optBtn} onClick={() => handleOption(k)}>
                  {OPTION_LABELS[k] || k}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className={styles.inputArea}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={step && step !== 'done' ? 'Type your answer...' : 'Ask me anything...'}
              disabled={step === 'sending' || loading}
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={step === 'sending' || loading || !input.trim()}
            >
              ➤
            </button>
          </div>

          <p className={styles.footer}>Powered by VerifyChain · team@verifychain.com.au</p>
        </div>
      )}
    </>
  );
}