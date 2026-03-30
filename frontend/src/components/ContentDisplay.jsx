import React, { useState } from 'react';
import { Copy, Check, Download, Calendar, User, FileText, Activity, Share2 } from 'lucide-react';
import { clsx } from 'clsx';

export default function ContentDisplay({ content }) {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content.generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content.generatedContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${content.topic.slice(0, 20)}-${content.contentType}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: 'long', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col gap-6 border-b border-purple-50 pb-8">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            {content.topic}
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="tag-pastel bg-purple-50 border-purple-100 text-purple-600">
              <FileText className="w-3.5 h-3.5 mr-1.5 inline" /> {content.contentType}
            </span>
            <span className="tag-pastel bg-blue-50 border-blue-100 text-blue-600">
              <User className="w-3.5 h-3.5 mr-1.5 inline" /> {content.audience}
            </span>
            <span className="tag-pastel bg-rose-50 border-rose-100 text-rose-600">
              <Activity className="w-3.5 h-3.5 mr-1.5 inline" /> {content.tone}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={clsx(
              "flex-1 h-16 rounded-2xl border-2 flex items-center justify-center gap-3 font-bold transition-all duration-300 text-lg",
              copied 
                ? "bg-green-50 border-green-200 text-green-600" 
                : "bg-white border-slate-100 text-slate-600 hover:border-purple-200 hover:bg-purple-50"
            )}
          >
            {copied ? (
              <>
                <Check className="w-6 h-6" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-6 h-6" />
                Copy Text
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center text-slate-400 hover:text-purple-500 hover:border-purple-200 hover:scale-105 transition-all duration-300"
            title="Download .txt"
          >
            <Download className="w-7 h-7" />
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-white/80 backdrop-blur-sm rounded-[2rem] p-10 md:p-14 border border-slate-100 text-slate-800">
          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-headings:text-slate-800">
            <div className="whitespace-pre-wrap leading-[1.8] text-2xl font-medium">
              {content.generatedContent}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Baked on {formatDate(content.timestamp)}
        </div>
        <div className="bg-slate-50 px-3 py-1 rounded-lg">
          {content.generatedContent.split(/\s+/).length} Words
        </div>
      </div>
    </div>
  );
}
