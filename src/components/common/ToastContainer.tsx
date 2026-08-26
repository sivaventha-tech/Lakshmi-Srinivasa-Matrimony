import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div id="toast-container" className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            id={`toast-${t.id}`}
            className="pointer-events-auto flex items-start p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-stone-200/80 text-stone-800"
          >
            <div className="flex-shrink-0 mr-3 mt-0.5">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-amber-600" />}
              {t.type === 'warning' && <AlertTriangle className="w-5 h-5 text-rose-600" />}
            </div>
            <div className="flex-1 min-w-0 pr-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">{t.title}</h4>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="flex-shrink-0 text-stone-400 hover:text-stone-700 transition p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
