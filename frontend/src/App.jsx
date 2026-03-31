import React, { useState } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';
import HistoryPanel from './components/HistoryPanel';
import { useHistory } from './hooks/useHistory';
import { Sparkles, History as HistoryIcon, AlertCircle, X } from 'lucide-react';
import { clsx } from 'clsx';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export default function App() {
  const [formData, setFormData] = useState({
    topic: '',
    audience: 'General audience',
    contentType: 'blog',
    tone: 'informative',
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
      const res = await fetch(`${API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      setGeneratedContent(data.data);
      addToHistory(data.data);
      setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setGeneratedContent(item);
    setFormData({ topic: item.topic, audience: item.audience, contentType: item.contentType, tone: item.tone });
    if (window.innerWidth < 1024) setIsHistoryOpen(false);
    setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <div className="relative min-h-screen flex bg-[#faf9f8] overflow-hidden">
      {/* Background blobs */}
      <div className="blob-1" />
      <div className="blob-2" />

      {/* Mobile history button */}
      <button
        onClick={() => setIsHistoryOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 btn-gradient text-white rounded-2xl flex items-center justify-center shadow-mist-lg"
      >
        <HistoryIcon className="w-6 h-6" />
      </button>

      {/* Main layout */}
      <div className="relative z-10 flex flex-1 min-w-0 lg:pr-80">

        {/* ─── Scrollable Content ─── */}
        <main className="flex-1 min-w-0 h-screen overflow-y-auto">

          {/* Top Nav */}
          <nav className="sticky top-0 z-30 bg-[#faf9f8]/80 backdrop-blur-md border-b border-[#eeeeed]">
            <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 btn-gradient rounded-xl flex items-center justify-center shadow-mist">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[1.05rem] font-bold tracking-tight text-[#1a1c1c]">
                    AI<span className="text-[#7c3aed]">GEN</span>
                  </span>
                  <p className="text-[10px] font-medium text-[#7b7487] -mt-0.5 uppercase tracking-widest">Content Studio</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ede0ff]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-pulse" />
                  <span className="text-[11px] font-semibold text-[#630ed4]">Gemini 2.5 Flash</span>
                </div>
                <button
                  onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f4f3f2] text-sm font-medium text-[#4a4455]"
                >
                  <HistoryIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </nav>

          <div className="max-w-3xl mx-auto px-6 py-10 space-y-10 pb-32">

            {/* Hero */}
            {!generatedContent && !loading && !error && (
              <div className="text-center space-y-4 pt-8 animate-fade-up">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#1a1c1c] leading-[1.08]">
                  Create content <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#630ed4] to-[#9d67ef]">
                    that converts.
                  </span>
                </h1>
                <p className="text-[#7b7487] text-lg font-normal max-w-xl mx-auto leading-relaxed">
                  Powered by Gemini 2.5 Flash. Blog posts, tweets, LinkedIn updates, and emails — in seconds.
                </p>
              </div>
            )}

            {/* Form Card */}
            <div className="glass rounded-[2rem] p-8 md:p-10 shadow-mist animate-fade-up">
              <h2 className="text-lg font-bold text-[#1a1c1c] mb-8 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#7c3aed]" />
                New Creation
              </h2>
              <ContentForm
                onSubmit={handleGenerate}
                loading={loading}
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="animate-fade-up flex items-start gap-4 p-6 rounded-2xl bg-rose-50 border border-rose-100">
                <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-rose-700">Generation failed</p>
                  <p className="text-sm text-rose-600/80 mt-0.5">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="glass rounded-[2rem] p-20 flex flex-col items-center gap-8 shadow-mist animate-fade-up">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full border-4 border-[#ede0ff]" />
                  <div className="absolute inset-0 rounded-full border-4 border-[#7c3aed] border-t-transparent animate-spin-ring" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#7c3aed] animate-pulse" />
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="font-bold text-xl text-[#1a1c1c]">Crafting your content...</p>
                  <p className="text-[#7b7487]">Consulting the AI oracle ✨</p>
                </div>
              </div>
            )}

            {/* Result */}
            {generatedContent && !loading && (
              <div id="result" className="glass rounded-[2rem] p-8 md:p-10 shadow-mist animate-fade-up scroll-mt-10">
                <ContentDisplay content={generatedContent} />
              </div>
            )}

          </div>
        </main>
      </div>

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
