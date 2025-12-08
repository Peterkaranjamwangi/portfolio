'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { resumeData, CONNECT_DATA } from '@/constants/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Message sent successfully!',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DashboardPage title="Contact" subtitle="Mission Briefing">
      <div className="h-full overflow-y-auto custom-scrollbar px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
              <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-3">
                <Mail className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <a
                href={`mailto:${resumeData.summary.email}`}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {resumeData.summary.email}
              </a>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
              <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-3">
                <Phone className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-1">Phone</h3>
              <a
                href={`tel:${resumeData.summary.phone}`}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {resumeData.summary.phone}
              </a>
            </div>

            <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
              <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-3">
                <MapPin className="text-cyan-400" size={24} />
              </div>
              <h3 className="text-white font-semibold mb-1">Location</h3>
              <p className="text-sm text-gray-400">{resumeData.summary.address}</p>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">{'>'}</span> Connect With Me
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CONNECT_DATA.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.info}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-black/40 border border-cyan-500/20 rounded-lg p-3 hover:border-cyan-500/50 transition-all"
                  >
                    <Icon className="text-cyan-400" size={20} />
                    <span className="text-white text-sm font-medium">
                      {social.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">{'>'}</span> Send Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-black/60 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-black/60 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-black/60 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="How can I help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-black/60 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Status message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 border font-semibold rounded-lg transition-all ${
                  isSubmitting
                    ? 'bg-gray-500/20 border-gray-500/30 text-gray-500 cursor-not-allowed'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50 hover:border-cyan-500 text-cyan-400'
                }`}
              >
                <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </DashboardPage>
  );
}
