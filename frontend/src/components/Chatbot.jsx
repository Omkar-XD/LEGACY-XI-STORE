import React, { useState } from 'react';
import axios from 'axios';
import { MessageCircle, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post('http://localhost:4000/api/chat', { message: input });
      const botMessage = { from: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '❌ Error: Unable to reach chatbot.' }
      ]);
    }

    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={toggleChat}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <div className="mt-2 w-80 bg-white border rounded-lg shadow-xl p-4 flex flex-col">
          <div className="flex-1 overflow-y-auto max-h-60 mb-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-1 text-sm px-2 py-1 rounded ${
                  msg.from === 'bot' ? 'bg-gray-100 text-left' : 'bg-blue-100 text-right'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="border px-2 py-1 rounded flex-1 text-sm"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
