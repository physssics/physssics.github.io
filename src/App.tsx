import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { InductionSimulation } from './components/InductionSimulation.tsx';
import { EducationalContent } from './components/EducationalContent.tsx';
import { MIN_POWER, MAX_POWER, MIN_FREQ, MAX_FREQ } from './constants.ts';

const Header = () => (
  <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#sim" className="hover:text-white transition-colors">Симуляция</a>
        <a href="#theory" className="hover:text-white transition-colors">Теория</a>
      </div>
    </div>
  </header>
);

export default function App() {
  const [power, setPower] = useState(1000);
  const [frequency, setFrequency] = useState(40);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
          >
            Токи Фуко и индукционный нагрев
          </motion.h2>
        </div>

        <section id="sim" className="space-y-12">
          <InductionSimulation power={power} frequency={frequency} />

          <div className="glass-panel p-8 grid md:grid-cols-2 gap-12 shadow-inner">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Мощность (Вт)</label>
                <span className="text-2xl font-bold text-white">{power}</span>
              </div>
              <input 
                type="range" 
                min={MIN_POWER} 
                max={MAX_POWER} 
                step={50}
                value={power}
                onChange={(e) => setPower(Number(e.target.value))}
                className="accent-slider accent-blue-500"
              />
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Частота (кГц)</label>
                <span className="text-2xl font-bold text-white">{frequency}</span>
              </div>
              <input 
                type="range" 
                min={MIN_FREQ} 
                max={MAX_FREQ} 
                step={1}
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="accent-slider accent-orange-500"
              />
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="legend-card">
              <div className="w-1 h-full bg-blue-400 rounded-full" />
              <div>
                <p className="font-bold text-sm mb-1 uppercase tracking-wider text-blue-500">Магнитный поток</p>
                <p className="text-xs text-slate-200">Силовые линии переменного магнитного поля, пронизывающие дно посуды</p>
              </div>
            </div>
            <div className="legend-card">
              <div className="w-1 h-full bg-yellow-400 rounded-full" />
              <div>
                <p className="font-bold text-sm mb-1 uppercase tracking-wider text-yellow-500">Токи Фуко</p>
                <p className="text-xs text-slate-200">Кольцевые индукционные токи, возникающие внутри электропроводящего дна в ответ на изменение потока</p>
              </div>
            </div>
            <div className="legend-card">
              <div className="w-1 h-full bg-red-400 rounded-full" />
              <div>
                <p className="font-bold text-sm mb-1 uppercase tracking-wider text-red-500">Зона нагрева</p>
                <p className="text-xs text-slate-200">Локализованное выделение тепла. Результат сопротивления металла</p>
              </div>
            </div>
          </div>
        </section>
      
        <div id="theory" className="mt-32">
          <EducationalContent />
        </div>
      </main>
    </div>
  );
}