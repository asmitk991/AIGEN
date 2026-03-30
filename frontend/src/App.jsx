import React, { useState, useEffect } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';
import HistoryPanel from './components/HistoryPanel';
import { useHistory } from './hooks/useHistory';
import { Sparkles, History as HistoryIcon, AlertCircle, Github } from 'lucide-react';
import { clsx } from 'clsx';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function App() {
  const [formData, setFormData] = useState({
    topic: '',
    audience: 'General audience',
    contentType: 'blog',
    tone: 'informative'
  });
  
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const { history, addToHistory, deleteFromHistory } = useHistory();

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setGeneratedContent(data.data);
      addToHistory(data.data);
      
      // Auto-scroll to result
      setTimeout(() => {
        document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.message);
      console.error('Generation Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setGeneratedContent(item);
    setFormData({
      topic: item.topic,
      audience: item.audience,
      contentType: item.contentType,
      tone: item.tone
    });
    if (window.innerWidth < 1024) setIsHistoryOpen(false);
    document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcfb] overflow-x-hidden">
      {/* Mobile Sidebar Control */}
      <button 
        onClick={() => setIsHistoryOpen(!isHistoryOpen)}
        className="lg:hidden fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl z-50 transition-transform active:scale-90"
      >
        <HistoryIcon className="w-10 h-10" />
      </button>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-indigo-50/60 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

        {/* Header */}
        <header className="px-12 py-12">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-pink-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-100 group-hover:rotate-12 transition-transform duration-500">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-black text-slate-800 tracking-tighter">
                  AI<span className="text-purple-500">GEN</span>
                </h1>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Gen-AI Content Studio</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
               <div className="px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-sm font-black uppercase tracking-widest text-slate-400">
                 Stable Release v1.0
               </div>
            </nav>
          </div>
        </header>

        <div className="flex-1 px-12 pb-32">
          <div className="max-w-5xl mx-auto space-y-24">
            {/* Hero Section */}
            {!generatedContent && !loading && !error && (
              <div className="text-center space-y-10 pt-16 animate-fadeIn">
                <div className="inline-flex items-center px-8 py-4 bg-white border border-purple-100 rounded-full text-purple-600 text-lg font-bold tracking-widest uppercase mb-4 shadow-xl">
                  ✨ Now with Gemini 2.5 Flash
                </div>
                <h2 className="text-7xl md:text-9xl font-black text-slate-800 tracking-tighter leading-[0.85]">
                  Let's create some <br />
                  <span className="text-white px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[3rem] inline-block mt-6 shadow-2xl">Magic.</span>
                </h2>
                <p className="text-slate-500 text-3xl font-medium max-w-3xl mx-auto leading-relaxed">
                  Turn your ideas into stunning blog posts, viral tweets, and professional emails with aesthetic ease.
                </p>
              </div>
            )}

            <div className="space-y-16">
              {/* Form Section */}
              <section className="glass-card p-14 md:p-20 shadow-2xl">
                <ContentForm 
                  onSubmit={handleGenerate} 
                  loading={loading}
                  formData={formData}
                  setFormData={setFormData}
                />
              </section>

              {/* Error State */}
              {error && (
                <div className="bg-rose-50 border-2 border-rose-100 p-10 rounded-[3rem] flex items-center gap-8 text-rose-600 animate-fadeIn shadow-2xl">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-10 h-10" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-3xl text-rose-700">Oops! Something stumbled.</p>
                    <p className="text-xl opacity-80 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Result Section */}
              <section id="result-area" className="scroll-mt-10">
                {loading ? (
                  <div className="glass-card p-32 flex flex-col items-center justify-center text-slate-400 gap-12 shadow-2xl">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 border-[12px] border-purple-50 rounded-full"></div>
                      <div className="absolute inset-0 border-[12px] border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-purple-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-center space-y-4">
                       <p className="text-slate-800 font-black text-4xl tracking-tighter">Baking your content...</p>
                       <p className="text-2xl font-medium">Spreading some aesthetic magic ✨</p>
                    </div>
                  </div>
                ) : (
                  generatedContent && (
                    <div className="glass-card p-14 md:p-20 animate-fadeIn mb-20 shadow-2xl">
                      <ContentDisplay content={generatedContent} />
                    </div>
                  )
                )}
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-12 py-20 border-t border-slate-100 bg-white/40 backdrop-blur-md mt-auto">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3 text-slate-800 font-black tracking-tighter text-4xl">
                AI<span className="text-purple-500">GEN</span>
              </div>
              <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
              <p className="text-lg font-bold text-slate-400 tracking-widest uppercase">Made for creators</p>
            </div>
            
            <div className="flex items-center gap-6 text-slate-400">
               <span className="text-sm font-black uppercase tracking-[0.4em]">v1.0.0</span>
            </div>
          </div>
        </footer>
      </main>

      {/* History Sidebar */}
      <HistoryPanel 
        history={history}
        onDelete={deleteFromHistory}
        onSelect={handleSelectHistory}
        activeId={generatedContent?.id}
        isOpen={isHistoryOpen}
        toggle={() => setIsHistoryOpen(!isHistoryOpen)}
      />
    </div>
  );
}
