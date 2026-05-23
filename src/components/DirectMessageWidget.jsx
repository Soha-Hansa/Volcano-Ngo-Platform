import { useState, useEffect, useRef } from 'react';
import './DirectMessageWidget.css';

export default function DirectMessageWidget({ activeDm, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatHistoryRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Load initial welcome message based on active DM target
  useEffect(() => {
    if (!activeDm) return;

    // Reset messages when active conversation target changes
    setIsTyping(false);
    
    let welcomeMsg = '';
    if (activeDm.role === 'ngo') {
      welcomeMsg = `Hi! Thanks for showing interest in our "${activeDm.opportunityRole || 'Volunteer'}" opportunity. We'd love to chat about your background and how we can work together. What skills or past projects do you have?`;
    } else {
      welcomeMsg = `Hi there! Thank you for visiting my volunteer profile. I am very passionate about supporting meaningful causes. What kind of campaigns or projects do you have coming up that I could help with?`;
    }

    setMessages([
      {
        id: `dm-welcome-${Date.now()}`,
        text: welcomeMsg,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [activeDm]);

  if (!activeDm) return null;

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: `dm-msg-${Date.now()}-user`,
      text: textToSend,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate response delay
    setTimeout(() => {
      let replyText = '';
      if (activeDm.role === 'ngo') {
        const cleanText = textToSend.toLowerCase();
        if (cleanText.includes('experience') || cleanText.includes('react') || cleanText.includes('work')) {
          replyText = `That sounds impressive! We have been looking for someone with exactly your skills. Would you be open to a quick 10-minute Zoom introduction on Wednesday or Thursday?`;
        } else if (cleanText.includes('time') || cleanText.includes('hours') || cleanText.includes('week')) {
          replyText = `We are flexible! Usually, it takes around 4-6 hours a week. We coordinate online and have weekly syncs. Does that timeline fit your schedule?`;
        } else {
          replyText = `Thank you for sharing! That sounds really aligned with our vision. I have forwarded your message to our project leads, and they would love to schedule a brief call. What is the best way to contact you?`;
        }
      } else {
        // Volunteer replying to NGO
        const cleanText = textToSend.toLowerCase();
        if (cleanText.includes('call') || cleanText.includes('zoom') || cleanText.includes('schedule')) {
          replyText = `I would love to! I'm free on Wednesday afternoons and Saturday mornings. Please let me know what time works best for you and send over the link!`;
        } else if (cleanText.includes('role') || cleanText.includes('project') || cleanText.includes('help')) {
          replyText = `That project sounds perfect for my skillset! I've worked on similar environmental and education campaigns. I'm excited to get started.`;
        } else {
          replyText = `Thank you so much! That works well for me. I've updated my calendar and look forward to collaborating. Let me know if you need any additional portfolio links in the meantime.`;
        }
      }

      const replyMsg = {
        id: `dm-msg-${Date.now()}-reply`,
        text: replyText,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, replyMsg]);
      setIsTyping(false);
    }, 1250);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputVal);
    }
  };

  // Get customized suggestion chips based on the target role
  const getSuggestions = () => {
    if (activeDm.role === 'ngo') {
      return [
        "I'd love to help! Here is my React experience.",
        "What is the expected weekly hours commitment?",
        "Is this role 100% remote?",
        "I am available to start immediately."
      ];
    } else {
      return [
        "We have a skill-based development role open.",
        "Would you be interested in a quick Zoom call?",
        "Your profile and timeline look fantastic!",
        "Could you help with our environmental campaign?"
      ];
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <div className="dm-widget-container" id="direct-message-popup">
      {/* Header */}
      <div className="dm-header">
        <div className="dm-header-glow"></div>
        <div className="dm-header-info">
          <div className="dm-avatar-wrapper">
            {activeDm.avatar ? (
              <img src={activeDm.avatar} alt={activeDm.name} className="dm-avatar-img" />
            ) : (
              <span>{getInitials(activeDm.name)}</span>
            )}
            <div className="dm-avatar-status"></div>
          </div>
          <div className="dm-header-title">
            <h4>{activeDm.name}</h4>
            <span>
              {activeDm.role === 'ngo' ? 'Active NGO Partner' : 'Verified Volunteer'}
            </span>
          </div>
        </div>
        <div className="dm-header-actions">
          {/* Close button */}
          <button 
            className="dm-header-btn" 
            onClick={onClose}
            aria-label="Close Chat"
            id="dm-close-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* History */}
      <div className="dm-history" ref={chatHistoryRef} id="dm-message-log">
        {messages.map((msg) => (
          <div key={msg.id} className={`dm-bubble-wrapper ${msg.sender}`} id={msg.id}>
            <div className="dm-bubble">
              {msg.text}
            </div>
            <span className="dm-timestamp">{msg.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="dm-bubble-wrapper them" id="dm-typing-indicator">
            <div className="dm-bubble">
              <div className="dm-typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className="dm-suggestions-container">
        <span className="dm-suggestions-label">Quick Responses</span>
        <div className="dm-suggestions-list">
          {getSuggestions().map((chip, idx) => (
            <button
              key={idx}
              className="dm-suggestion-chip"
              onClick={() => handleSend(chip)}
              id={`dm-suggestion-chip-${idx}`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="dm-input-form">
        <input
          type="text"
          className="dm-input-field"
          placeholder={`Message ${activeDm.name.split(' ')[0]}...`}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isTyping}
          id="dm-text-input"
        />
        <button
          className="dm-send-btn"
          onClick={() => handleSend(inputVal)}
          disabled={!inputVal.trim() || isTyping}
          aria-label="Send Direct Message"
          id="dm-submit-send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}
