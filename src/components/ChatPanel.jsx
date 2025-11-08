import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ChatPanel() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Ask AURA anything…' }]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const reduce = useReducedMotion();
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    if (!input.trim() || streaming) return;
    const userMsg = { role: 'user', content: input };
    setMessages((m) => [...m, userMsg, { role: 'assistant', content: '' }]);
    setInput('');

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL || ''}/api/chat/stream`;
      const res = await fetch(url);
      if (!res.ok || !res.body) throw new Error('Stream failed');

      setStreaming(true);
      const reader = res.body.getReader();
      const decoder = new TextDecoder('utf-8');
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last && last.role === 'assistant') last.content += chunk;
          return copy;
        });
      }
    } catch (e) {
      setMessages((m) => [...m, { role: 'system', content: 'Streaming not available yet.' }]);
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur">
      <h3 className="mb-3 text-lg font-semibold">AURA Chat</h3>
      <div ref={listRef} className="h-44 overflow-auto rounded-lg border border-white/10 bg-black/30 p-3 text-sm">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
            <span className="mr-2 inline-block w-20 shrink-0 text-white/50">{m.role}:</span>
            <span className="whitespace-pre-wrap text-white/90">{m.content}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question…"
          className="flex-1 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm placeholder:text-white/40 focus:border-white/30 focus:outline-none"
        />
        <button onClick={send} disabled={streaming} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-60">
          {streaming ? 'Streaming…' : 'Send'}
        </button>
      </div>
    </div>
  );
}
