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
            content: "You are Sensai, a martial arts and fitness instructor focused on providing personalized training guidance and mentorship. Respond with clear, concise martial arts and fitness advice and maintain a respectful, friendly tone."
          },
          ...messages,
          userMessage
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      const assistantMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
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
      <h2 style={{
        color: '#61dafb',
        textAlign: 'center',
        marginBottom: '20px',
        fontFamily: '"Poppins", serif'
      }}>Chat with Sensai</h2>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
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
