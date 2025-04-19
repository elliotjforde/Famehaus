
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const taglines = [
    "It’s designed.",
    "It’s strategy.",
    "It’s storytelling.",
    "It’s content.",
    "It’s paid media.",
    "It’s FameHaus AI."
  ];

  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', handle: '', why: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('https://your-google-webhook-here', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setSubmitted(true);
      setFormData({ name: '', handle: '', why: '' });
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center justify-center px-4">
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Fame isn’t luck.
      </motion.h1>

      <motion.h2
        className="text-2xl md:text-3xl font-light mb-8"
        key={taglines[index]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {taglines[index]}
      </motion.h2>

      <button
        onClick={() => setShowForm(true)}
        className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition"
      >
        Apply Now
      </button>

      {showForm && (
        <div className="mt-10 w-full max-w-md">
          {submitted ? (
            <div className="text-center">Thank you. We’ll be in touch if selected.</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-3 bg-black border border-gray-600 rounded"
                required
              />
              <input
                type="text"
                placeholder="Instagram / TikTok / YouTube Handle"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                className="p-3 bg-black border border-gray-600 rounded"
                required
              />
              <textarea
                placeholder="Why do you want to be famous?"
                value={formData.why}
                onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                className="p-3 bg-black border border-gray-600 rounded"
                rows={4}
                required
              />
              <button type="submit" className="bg-white text-black py-2 rounded hover:bg-gray-200">
                Submit
              </button>
            </form>
          )}
        </div>
      )}
    </main>
  );
}
