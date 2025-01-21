import React, { useState } from 'react';
import OpenAI from 'openai';
import './sensai.css';

const Sensai = () => {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Greetings! I am Sensai, your all in one personal martial arts and fitness companion. I'm here to provide guidance. Whether you need advice on technique, training programs, or general fitness - I'm here to assist. What would you like to know?"
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_SENSAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const formatResponse = (text) => {
    // Format lists
    text = text.replace(/^\d+\.\s/gm, '• ');
    text = text.replace(/^\-\s/gm, '• ');
    
    // Format headers/sections based on number of asterisks
    text = text.replace(/\*\*\*\*([^*]+)\*\*\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
    
    // Add line breaks for readability
    text = text.replace(/\n/g, '<br/>');
    
    return text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are Sensai, a martial arts and fitness instructor focused on providing personalized training guidance and mentorship. Respond with clear, concise martial arts and fitness advice and maintain a respectful, friendly tone. Use bullet points and sections to organize information."
          },
          ...messages,
          userMessage
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const formattedContent = formatResponse(response.choices[0].message.content);
      const assistantMessage = {
        role: 'assistant',
        content: formattedContent
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    }

    setIsLoading(false);
  };

  return (
    <div className="sensai-container">
      <div className="sensai-header">
        <div className="sensai-avatar">
          <p className="avatar-img">AI</p>
        </div>
        <div className="sensai-info">
          <strong className="sensai-title">Sensai</strong>
          <p className="sensai-subtitle">Your Personal Martial Arts & Fitness Guide</p>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role}`}
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        ))}
        {isLoading && (
          <div className="loading">
            Sensai is thinking
            <span className="dot-animation">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Sensai a question..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Sensai;
