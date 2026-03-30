import React from 'react';
import { Send, Sparkles, Wand2 } from 'lucide-react';
import { clsx } from 'clsx';

const audiences = [
  'General audience',
  'Tech professionals',
  'Small business owners',
  'Students',
  'Marketing teams',
  'Entrepreneurs',
  'HR professionals'
];

const contentTypes = [
  { id: 'blog', label: 'Blog Post', icon: '📝', color: 'bg-purple-100 text-purple-600 border-purple-200' },
  { id: 'tweet', label: 'Tweets', icon: '🐦', color: 'bg-blue-100 text-blue-600 border-blue-200' },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼', color: 'bg-indigo-100 text-indigo-600 border-indigo-200' },
  { id: 'email', label: 'Email', icon: '📧', color: 'bg-peach-100 text-orange-600 border-orange-200' }
];

const tones = [
  'informative',
  'casual',
  'professional',
  'humorous',
  'persuasive',
  'inspirational'
];

export default function ContentForm({ onSubmit, loading, formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-fadeIn">
      <div className="space-y-4">
        <label className="text-xl font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-purple-400" />
          The Topic
        </label>
        <textarea
          name="topic"
          required
          value={formData.topic}
          onChange={handleChange}
          placeholder="What's on your mind? (e.g. The future of AI, My first startup...)"
          className="w-full input-pastel min-h-[160px] resize-none text-2xl text-slate-800 placeholder:text-slate-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <label className="text-xl font-bold text-slate-500 uppercase tracking-widest">Target Audience</label>
          <select
            name="audience"
            value={formData.audience}
            onChange={handleChange}
            className="w-full input-pastel text-2xl text-slate-800 font-semibold cursor-pointer appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1em]"
          >
            {audiences.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <label className="text-xl font-bold text-slate-500 uppercase tracking-widest">Atmosphere (Tone)</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full input-pastel text-2xl text-slate-800 font-semibold cursor-pointer appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1em]"
          >
            {tones.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        <label className="text-xl font-bold text-slate-500 uppercase tracking-widest block">Choose Format</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {contentTypes.map(({ id, label, icon, color }) => (
            <label
              key={id}
              className={clsx(
                "relative flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-300 group",
                formData.contentType === id 
                  ? `${color.split(' ')[0]} border-purple-400 bg-white shadow-2xl shadow-purple-100 scale-105` 
                  : "border-slate-100 bg-white hover:border-purple-200 hover:bg-slate-50"
              )}
            >
              <input
                type="radio"
                name="contentType"
                value={id}
                checked={formData.contentType === id}
                onChange={handleChange}
                className="sr-only"
              />
              <span className={clsx(
                "text-5xl mb-4 transition-transform duration-300 group-hover:scale-110",
                formData.contentType === id ? "animate-float" : ""
              )}>{icon}</span>
              <span className={clsx(
                "text-sm font-black uppercase tracking-tighter opacity-70",
                formData.contentType === id ? "text-purple-600" : "text-slate-400"
              )}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={clsx(
          "w-full h-24 rounded-[2.5rem] btn-primary-pastel text-3xl shadow-2xl transition-all duration-500",
          loading && "opacity-60 cursor-not-allowed"
        )}
      >
        {loading ? (
          <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Sparkles className="w-8 h-8" />
            Bake some content ✨
          </>
        )}
      </button>
    </form>
  );
}
