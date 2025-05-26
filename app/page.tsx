'use client';

import React, { useState, useEffect } from 'react';

const API_BASE = 'https://server-2-97m0.onrender.com';

interface Message {
  id: number;
  usuario: string;
  mensaje: string;
  fecha: string;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [usuario, setUsuario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario || !mensaje) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/post-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, mensaje }),
      });

      if (res.ok) {
        setUsuario('');
        setMensaje('');
        await fetchMessages(); // Refresh message list
      } else {
        const error = await res.json();
        console.error('Error posting message:', error);
      }
    } catch (error) {
      console.error('Error submitting message:', error);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Leave a Message</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Write something..."
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Messages</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="border p-4 rounded shadow-sm">
            <div className="font-bold">{msg.usuario}</div>
            <div className="text-sm text-gray-600">
              {new Date(msg.fecha).toLocaleString()}
            </div>
            <p className="mt-2">{msg.mensaje}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-500">No messages yet.</p>
        )}
      </div>
    </main>
  );
}