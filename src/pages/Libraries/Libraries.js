import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Libraries.css'; // Your custom styles
import groqClient from '../../groq'; // Import your Groq client

const Libraries = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setIsLoading(true);
      setMessages((prev) => [...prev, { sender: 'user', text: userInput }]);

      try {
        const params = {
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput },
          ],
          model: 'llama3-8b-8192', // Specify your OpenAI model
        };

        // Use the Groq client to send the request
        const chatCompletion = await groqClient.chat.completions.create(params);

        const aiResponse = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
        setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: "Sorry, something went wrong!" },
        ]);
      }

      setIsLoading(false);
      setUserInput('');
    }
  };

  return (
    <div className="libraries-container">
      <h2 className="libraries-heading">AI Chat - Ask Me Anything!</h2>

      {/* Chat Interface Section */}
      <div className="chat-section">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isLoading && <div className="message ai">Thinking...</div>}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      {/* Back to Dashboard Button */}
      <Link to="/dashboard" className="back-dashboard-button">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Libraries;
