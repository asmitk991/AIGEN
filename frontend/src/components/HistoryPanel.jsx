import React from 'react';
import { History, Trash2, Clock, ChevronRight, X, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export default function HistoryPanel({ history, onDelete, onSelect, activeId, isOpen, toggle }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric'
    });
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-md z-40 lg:hidden"
          onClick={toggle}
        />
      )}

      <aside className={clsx(`
        fixed inset-y-0 right-0 w-85 bg-white/90 backdrop-blur-xl border-l border-white/50 z-50 transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0 shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)]' : 'translate-x-full'}
      `)}>
        <div className="flex flex-col h-full">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center">
                <History className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter">AIGEN</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{history.length} Saved Bakes</p>
              </div>
            </div>
            <button 
              onClick={toggle}
              className="lg:hidden w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-slate-200" />
                </div>
                <h4 className="font-bold text-slate-400 mb-2">No history yet</h4>
                <p className="text-sm text-slate-300">Your future masterpieces will appear here.</p>
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  className={clsx(
                    "group relative p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden",
                    activeId === item.id 
                      ? 'border-purple-200 bg-white shadow-xl shadow-purple-50 scale-[1.02]' 
                      : 'border-slate-50 bg-white/50 hover:border-purple-100 hover:bg-white hover:shadow-lg hover:shadow-slate-100'
                  )}
                  onClick={() => onSelect(item)}
                >
                  {/* Accent bar */}
                  <div className={clsx(
                    "absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300",
                    activeId === item.id ? 'bg-purple-400' : 'bg-transparent group-hover:bg-purple-100'
                  )} />

                  <div className="pl-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                        {item.contentType}
                      </span>
                      <span className="text-[9px] font-bold text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(item.timestamp)}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-700 line-clamp-2 leading-relaxed">
                      {item.topic}
                    </h4>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-xl text-slate-200 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
