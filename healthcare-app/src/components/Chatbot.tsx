import React, { useState, useRef, useEffect } from 'react';
import { GeminiAIService } from '../services/GeminiAIService';
import './Chatbot.css';

interface ChatbotProps {
  show: boolean;
  userHealthData?: any;
  onClose?: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot = ({ show, userHealthData, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState([] as Message[]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (show && messages.length === 0 && userHealthData) {
      // Initial greeting when chatbot is shown
      const greeting = `Hello ${userHealthData.name}! 👋 I'm Saara, your AI health assistant. I've reviewed your health profile and I'm here to help answer any questions about your health, symptoms, or the analysis results. What would you like to know?`;
      
      setMessages([{
        id: Date.now().toString(),
        text: greeting,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [show, userHealthData, messages.length]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsLoading(true);

    try {
      let response: string;
      
      if (userHealthData) {
        // Add conversation context and variation for more dynamic responses
        const conversationContext = messages.slice(-2).map(m => 
          `${m.isUser ? 'User' : 'Saara'}: ${m.text.substring(0, 100)}...`
        ).join('\n');
        
        const enhancedQuery = messages.length > 1 
          ? `Recent conversation:\n${conversationContext}\n\nNew question: ${inputValue.trim()}`
          : `First question: ${inputValue.trim()}`;
        
        // Use AI service with conversation context for varied responses
        response = await GeminiAIService.analyzeHealthWithAI(userHealthData, enhancedQuery);
      } else {
        // General health query with time and randomness for variation
        const timeOfDay = new Date().getHours() < 12 ? 'morning' : 
                         new Date().getHours() < 17 ? 'afternoon' : 'evening';
        const randomGreeting = Math.random() > 0.5 ? 'Hello there!' : 'Hi!';
        
        response = await GeminiAIService.callGeminiAPI(
          `You are Saara, a friendly AI health assistant. ${randomGreeting} It's ${timeOfDay}. Someone asks: "${inputValue.trim()}"
           
           Please respond naturally and conversationally. Vary your approach each time - use different phrasings, examples, and styles. Be empathetic, helpful, and personal. Keep under 150 words.
           
           Important: Make each response feel fresh and different. Don't use repetitive language patterns.`
        ) || "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or consider consulting a healthcare provider for immediate concerns.";
      }

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000); // Simulate thinking time

    } catch (error) {
      console.error('Chat error:', error);
      
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "I apologize, but I'm experiencing some technical difficulties right now. Please try again in a moment, or consider consulting a healthcare provider if you have urgent health concerns.",
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleOverlayClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleContainerClick = (e: any) => {
    e.stopPropagation();
  };

  if (!show) return null;

  return (
    <div className="chatbot-overlay" onClick={handleOverlayClick}>
      <div className="chatbot-container" onClick={handleContainerClick}>
        <div className="chatbot-header">
          <div className="bot-info">
            <img 
              src="https://www.godaddy.com/resources/in/wp-content/uploads/sites/13/2024/07/ai-logo-design-bird-iteration-4-1024x1024-1.webp?size=1024x1024" 
              alt="Saara AI" 
              className="bot-avatar"
            />
            <div>
              <h3>Saara</h3>
              <span>Your AI Health Assistant</span>
            </div>
          </div>
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
              <div className="message-content">
                {message.text}
              </div>
              <div className="message-timestamp">
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Saara about your health..."
            className="message-input"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="send-button"
          >
            <span className="send-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
