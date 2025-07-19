import React from 'react';
import Head from 'next/head';
import AgentBuilder from '../components/AgentBuilder';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Head>
        <title>AgentForge – Visual Agent Builder</title>
        <meta name="description" content="Build sophisticated AI agents visually with drag-and-drop interface" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* Luxury Header */}
        <div className="relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl transform -translate-x-1/2"></div>
          </div>

          {/* Header Content */}
          <div className="relative z-10 pt-16 pb-8">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4">
                AgentForge ⚙️
              </h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-xl text-gray-300 mb-2"
              >
                Visually build and deploy sophisticated AI Agents
              </motion.p>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="text-sm text-gray-500 mb-8"
              >
                Enterprise-grade AI workflow automation • No coding required
              </motion.p>

              {/* Feature Pills */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex justify-center gap-4 mb-8"
              >
                <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm">
                  🧠 Multi-AI Models
                </div>
                <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm">
                  🔗 API Integrations
                </div>
                <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-300 text-sm">
                  📊 Real-time Analytics
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="mx-4 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-2xl overflow-hidden">
            <AgentBuilder />
          </div>
        </motion.div>

        {/* Bottom Stats Bar */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="mt-8 mb-4"
        >
          <div className="flex justify-center">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 shadow-2xl">
              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-white/60">Status:</span>
                  <span className="text-emerald-400 font-semibold">Live Demo</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Models:</span>
                  <span className="text-white">GPT-4 • Gemini Pro</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">Performance:</span>
                  <span className="text-purple-400">94.7% Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}