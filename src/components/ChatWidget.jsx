import { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: "Hi! I'm Volca, your Volcano Support Assistant. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const historyEndRef = useRef(null);
  const chatHistoryRef = useRef(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // If opening for first time, clear unread badge
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const getSystemResponse = (userInput) => {
    const cleanInput = userInput.toLowerCase();

    // Check for keywords
    if (cleanInput.includes('what is volcano') || cleanInput.includes('how does it work') || cleanInput.includes('volcano?')) {
      return "Volcano is a digital matching platform that connects skilled professionals (developers, writers, designers, educators) with NGOs looking for volunteer talent. We bridge the gap between passion and professional expertise.";
    }
    if (cleanInput.includes('free') || cleanInput.includes('cost') || cleanInput.includes('pay') || cleanInput.includes('charge')) {
      return "Yes, Volcano is 100% free for both individual volunteers looking to make an impact and registered NGOs looking to scale their operations.";
    }
    if (cleanInput.includes('multiple') || cleanInput.includes('campaign') || cleanInput.includes('limit') || cleanInput.includes('simultaneous')) {
      return "Yes! NGOs can host and manage multiple campaigns simultaneously from their dashboard. You can track volunteer metrics, manage incoming applications, and update event timelines separately for each listing.";
    }
    if (cleanInput.includes('communicate') || cleanInput.includes('message') || cleanInput.includes('contact') || cleanInput.includes('talk')) {
      return "Volcano provides a central message center in your NGO Dashboard where you can view applicant list profiles, invite selected volunteers to projects, and coordinate execution details seamlessly.";
    }
    if (cleanInput.includes('hour') || cleanInput.includes('commitment') || cleanInput.includes('time') || cleanInput.includes('minimum')) {
      return "No. Volcano is designed for flexibility. You can choose micro-projects (e.g., a 2-hour branding review) or long-term partnerships.";
    }
    if (cleanInput.includes('certificate') || cleanInput.includes('completion') || cleanInput.includes('gmail') || cleanInput.includes('email') || cleanInput.includes('proof')) {
      return "Absolutely yes! After completing a volunteer project, a certificate of completion is generated and sent directly to your registered Gmail address.";
    }
    if (cleanInput.includes('hello') || cleanInput.includes('hi') || cleanInput.includes('hey')) {
      return "Hello! How can I assist you with volunteer work or campaigns today?";
    }

    // Default fallback
    return "Thank you for asking! Volcano is designed to bridge the gap between professional expertise and social causes. If you have specific account inquiries, feel free to email our team at support@volcano.org!";
  };

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}-user`,
      text: textToSend,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const responseText = getSystemResponse(textToSend);
      const botMessage = {
        id: `msg-${Date.now()}-bot`,
        text: responseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 850);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputVal);
    }
  };

  const suggestionChips = [
    "What is Volcano?",
    "Is it free to use?",
    "Can we post multiple campaigns?",
    "Is there a certificate?"
  ];

  return (
    <div className="chat-widget-root">
      
      {/* Floating Action Button (FAB) */}
      <div className="chat-fab-container">
        {hasUnread && <div className="chat-fab-badge"></div>}
        <div className="chat-fab-pulse"></div>
        <button
          className="chat-fab"
          onClick={toggleChat}
          aria-label="Toggle Support Chat"
          id="chat-toggle-btn"
        >
          {isOpen ? (
            // Close SVG
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Message/Chat SVG
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      <div className={`chat-window ${isOpen ? 'opened' : 'closed'}`} id="chat-window-panel">
        
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-glow"></div>
          <div className="chat-header-info">
            <div className="chat-avatar-wrapper">
              <img 
                src="/favicorn.png" 
                alt="Volca Logo" 
                style={{ width: '22px', height: '22px', objectFit: 'contain' }} 
              />
              <div className="chat-avatar-status"></div>
            </div>
            <div className="chat-header-title">
              <h4>Volca Support</h4>
              <span>Online Assistant</span>
            </div>
          </div>
          <button
            className="chat-header-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat"
            id="chat-header-close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>

        {/* Message Log Area */}
        <div className="chat-history" ref={chatHistoryRef} id="chat-history-log">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble-wrapper ${msg.sender}`} id={msg.id}>
              <div className="chat-bubble">
                {msg.text}
              </div>
              <span className="chat-timestamp">{msg.time}</span>
            </div>
          ))}
          
          {/* Animated typing dots */}
          {isTyping && (
            <div className="chat-bubble-wrapper bot" id="bot-typing-indicator">
              <div className="chat-bubble">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="chat-suggestions-container">
          <span className="chat-suggestions-label">Common Questions</span>
          <div className="chat-suggestions-list">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                className="chat-suggestion-chip"
                onClick={() => handleSend(chip)}
                id={`chat-suggestion-chip-${idx}`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input text form */}
        <div className="chat-input-form">
          <input
            type="text"
            className="chat-input-field"
            placeholder="Ask a question..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isTyping}
            id="chat-text-input"
          />
          <button
            className="chat-send-btn"
            onClick={() => handleSend(inputVal)}
            disabled={!inputVal.trim() || isTyping}
            aria-label="Send Message"
            id="chat-send-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>

      </div>

    </div>
  );
}
