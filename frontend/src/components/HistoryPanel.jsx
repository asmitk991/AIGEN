import React from 'react';
import { Trash2, Sparkles, Clock } from 'lucide-react';
import { clsx } from 'clsx';

const typeIcon = { blog: '📝', tweet: '🐦', linkedin: '💼', email: '📧' };

const typeColors = {
  blog:     'text-violet-600 bg-violet-50',
  tweet:    'text-sky-600 bg-sky-50',
  linkedin: 'text-indigo-600 bg-indigo-50',
  email:    'text-purple-600 bg-purple-50',
};

export default function HistoryPanel({ history, onDelete, onSelect, activeId, isOpen, toggle }) {
  const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden" onClick={toggle} />
      )}

      <aside className={clsx(
        'fixed inset-y-0 right-0 z-50 w-80 flex flex-col bg-[#faf9f8] border-l border-[#eeeeed] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'lg:sticky lg:top-0 lg:right-auto lg:inset-y-auto lg:z-auto lg:h-screen lg:translate-x-0 lg:shadow-none',
        isOpen ? 'translate-x-0 shadow-[-20px_0_60px_-10px_rgba(124,58,237,0.08)]' : 'translate-x-full'
      )}>

        {/* Header */}
        <div className="px-6 pt-8 pb-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-[#1a1c1c] tracking-tight">History</h3>
            <span className="badge bg-[#ede0ff] text-[#630ed4]">{history.length}</span>
          </div>
          <p className="text-xs text-[#7b7487]">Your recent generations</p>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-[#f4f3f2] rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-[#ccc3d8]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#4a4455]">No history yet</p>
                <p className="text-xs text-[#7b7487] mt-1">Keep creating to see more.</p>
              </div>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={clsx('history-card p-4 group relative', activeId === item.id && 'active')}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5 flex-shrink-0">{typeIcon[item.contentType] || '📄'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1a1c1c] line-clamp-2 leading-snug mb-2">
                      {item.topic}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={clsx('badge', typeColors[item.contentType] || 'text-violet-600 bg-violet-50')}>
                        {item.contentType}
                      </span>
                      <span className="text-[10px] text-[#7b7487] flex items-center gap-1">
                        <Clock className="w-3 h-3" />{formatDate(item.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
                  className="absolute top-3 right-3 p-1.5 rounded-lg text-[#ccc3d8] hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>


      </aside>
    </>
  );
}
