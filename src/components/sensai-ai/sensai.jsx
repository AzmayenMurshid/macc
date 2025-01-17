import React, { useState } from 'react';
import './sensai.css';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export default function SensaiAI() {
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm Sensei AI, your martial arts training companion. How can I help you today?",
            sender: "ai"
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("inputMessage", inputMessage);
        if (!inputMessage.trim() || isLoading) return;

        // Add user message
        const newMessages = [...messages, { text: inputMessage, sender: "user" }];
        setMessages(newMessages);
        setInputMessage('');
        setIsLoading(true);

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system", 
                        content: "You are Sensei AI, a martial arts training companion. You help users with martial arts techniques, training advice, and general fitness guidance. Keep responses focused on martial arts and training. Format your responses with markdown for better readability - use headers, bullet points, and emphasis where appropriate."
                    },
                    ...newMessages.map(msg => ({
                        role: msg.sender === "user" ? "user" : "assistant",
                        content: msg.text
                    }))
                ],
                temperature: 0.7,
                max_tokens: 500,
                top_p: 0.9,
                frequency_penalty: 0.5,
                presence_penalty: 0.5
            });

            const aiResponse = completion.choices[0].message.content;
            
            // Format the response with line breaks and spacing
            const formattedResponse = aiResponse
                .replace(/\n\n/g, '<br/><br/>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                .replace(/^\- (.*$)/gm, '• $1');

            setMessages([...newMessages, {
                text: formattedResponse,
                sender: "ai"
            }]);
        } catch (error) {
            console.error('Error getting AI response:', error);
            setMessages([...newMessages, {
                text: "I apologize, but I'm having trouble connecting right now. Please try again later.",
                sender: "ai"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div 
                        key={index} 
                        className={`message ${message.sender === "ai" ? "ai" : "user"}`}
                        dangerouslySetInnerHTML={{ __html: message.text }}
                    />
                ))}
                {isLoading && (
                    <div className="message ai">
                        <span className="typing-dots">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </span>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask your sensei a question..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
}
