'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatSupportLabel = ({ isOpen, toggle }) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll para o fim ao adicionar mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!message.trim()) return;

    const currentMessage = message;
    setMessage('');
    setChat((prev) => [...prev, `Você: ${currentMessage}`]);

    try {
      const res = await axios.post('http://129.146.58.182:3080/api/chat', {
        prompt: currentMessage,
      });
      setChat((prev) => [...prev, `DPchat AI: ${res.data.response}`]);
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      setChat((prev) => [...prev, 'Erro: não foi possível responder.']);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white shadow-lg rounded-lg w-80 h-96 z-50 flex flex-col">
      <div className="flex flex-row justify-between items-center mb-2">
        <span className="text-xs text-gray-500">Chat Support</span>
        <button
          onClick={toggle}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          aria-label="Fechar chat"
        >
          <i className="bi bi-x-lg text-xl"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 mb-2">
        {chat.map((msg, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded text-sm">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Pergunte algo ao DPchat AI"
          className="flex-1 h-16 resize-none border rounded px-2 py-1 outline-none text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatSupportLabel;
