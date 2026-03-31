import React from 'react';
import { clsx } from 'clsx';
import { Sparkles, ChevronDown } from 'lucide-react';

const audiences = [
  'General audience', 'Tech professionals', 'Small business owners',
  'Students', 'Marketing teams', 'Entrepreneurs', 'HR professionals'
];

const tones = [
  'Informative', 'Casual', 'Professional', 'Humorous', 'Persuasive', 'Inspirational'
];

const contentTypes = [
  { id: 'blog',     label: 'Blog Post',  sub: 'SEO-optimized long form',           icon: '📝' },
  { id: 'tweet',    label: 'Tweets',     sub: 'Viral thread generation',            icon: '🐦' },
  { id: 'linkedin', label: 'LinkedIn',   sub: 'Thought leadership updates',         icon: '💼' },
  { id: 'email',    label: 'Email',      sub: 'High-converting outreach',           icon: '📧' },
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Textarea */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-[#7b7487] mb-3">
          What's your topic?
        </label>
        <textarea
          name="topic"
          required
          value={formData.topic}
          onChange={handleChange}
          placeholder="Describe what you want to create — a blog post, a tweet, a marketing email..."
          rows={5}
          className="input-studio w-full px-5 py-4 text-[1rem] leading-relaxed text-[#1a1c1c] placeholder:text-[#ccc3d8] resize-none"
        />
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#7b7487] mb-3">
            Target Audience
          </label>
          <div className="relative">
            <select
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="input-studio w-full px-5 py-4 text-sm font-medium text-[#1a1c1c] appearance-none cursor-pointer pr-10"
            >
              {audiences.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b7487] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#7b7487] mb-3">
            Tone & Atmosphere
          </label>
          <div className="relative">
            <select
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="input-studio w-full px-5 py-4 text-sm font-medium text-[#1a1c1c] appearance-none cursor-pointer pr-10"
            >
              {tones.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b7487] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Content Type Cards */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-[#7b7487] mb-4">
          Format
        </label>
        <div className="grid grid-cols-2 gap-4">
          {contentTypes.map(({ id, label, sub, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, contentType: id }))}
              className={clsx('type-card text-left p-5', formData.contentType === id && 'selected')}
            >
              <span className={clsx(
                'text-3xl block mb-3 transition-transform duration-300',
                formData.contentType === id ? 'scale-110' : 'group-hover:scale-110'
              )}>{icon}</span>
              <p className={clsx(
                'font-semibold text-sm mb-1',
                formData.contentType === id ? 'text-[#630ed4]' : 'text-[#1a1c1c]'
              )}>{label}</p>
              <p className="text-xs text-[#7b7487] leading-relaxed">{sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gradient text-white font-semibold py-5 rounded-2xl flex items-center justify-center gap-3 text-base tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin-ring w-5 h-5 border-2 border-white/30 border-t-white rounded-full" viewBox="0 0 24 24" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Bake some content ✨
          </>
        )}
      </button>
    </form>
  );
}
