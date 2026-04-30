import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { MIN_POWER, MAX_POWER, MIN_FREQ, MAX_FREQ } from '../constants.ts';

export const InductionSimulation: React.FC<{power: number, frequency: number}> = ({ power, frequency }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frameId = requestAnimationFrame(function update(t) {
      setTime(t / 1000);
      frameId = requestAnimationFrame(update);
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const powerFactor = (power - MIN_POWER) / (MAX_POWER - MIN_POWER);
  const freqFactor = (frequency - MIN_FREQ) / (MAX_FREQ - MIN_FREQ);
  
  const skinDepth = 15 - (freqFactor * 12); 
  const pulseDuration = 2.5 - (freqFactor * 2.2); 
  const fluxOpacity = 0.1 + (powerFactor * 0.5);

  const labelStyle = "text-[16px] font-black fill-white drop-shadow-[0_0_8px_rgba(59,130,246,1)] pointer-events-none";

  return (
    <div className="simulation-view relative flex flex-col items-center justify-center bg-slate-950 rounded-[40px] border border-slate-800 overflow-hidden h-[550px] shadow-2xl">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px]" />

      <svg viewBox="0 0 500 500" className="w-full h-full max-w-[600px] drop-shadow-2xl font-sans">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
        </defs>

        <g transform="translate(250, 245)">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.ellipse
              key={`flux-${i}`} cx="0" cy="0"
              rx={55 + i * 40} ry={65 + i * 30}
              fill="none" stroke="#3b82f6"
              strokeWidth={1.2 + powerFactor * 4}
              strokeDasharray="6,8"
              animate={{ opacity: [0.05, fluxOpacity / (i * 0.5), 0.05], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </g>

        <rect x="50" y="232" width="400" height="10" fill="#475569" rx="2" />
        <text x="15" y="240" className={labelStyle}>2</text>

        <rect x="60" y="245" width="380" height="5" fill="#1e293b" opacity="0.9" />
        <text x="15" y="260" className={labelStyle}>3</text>

        <g transform="translate(100, 275)">
          {[0, 1, 2, 3, 5, 6, 7, 8].map((i) => (
            <g key={`coil-${i}`} transform={`translate(${i * 35}, 0)`}>
              <circle r="9" fill="none" stroke="#b45309" strokeWidth="2.5" />
              {i < 4 ? (
                <g>
                  <line x1="-3" y1="-3" x2="3" y2="3" stroke="#fbbf24" strokeWidth="2" />
                  <line x1="3" y1="-3" x2="-3" y2="3" stroke="#fbbf24" strokeWidth="2" />
                </g>
              ) : (
                <circle r="2.5" fill="#fbbf24" />
              )}
            </g>
          ))}
          <text x="-45" y="10" className={labelStyle}>4</text>
        </g>

        <g transform="translate(125, 40)">
          <rect x="0" y="20" width="250" height="175" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
          <path d="M0,20 Q125,-15 250,20" fill="#334155" stroke="#64748b" strokeWidth="3" />
          <circle cx="125" cy="5" r="9" fill="#475569" />
          
          <rect x="0" y="180" width="250" height="10" fill="#0f172a" />
          <motion.rect
            x="2" y={195 - skinDepth} width="246" height={skinDepth}
            fill="#ef4444"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: pulseDuration, repeat: Infinity }}
            filter="url(#glow)"
          />
          <text x="275" y="100" className={labelStyle}>1</text>
        </g>

        <g transform="translate(140, 345)">
          <rect x="0" y="0" width="90" height="95" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <text x="12" y="45" fill="#3b82f6" className="text-[10px] font-mono italic font-bold tracking-tighter">
             {frequency} kHz
          </text>
          <text x="-40" y="55" className={labelStyle}>5</text>

          <rect x="125" y="0" width="90" height="95" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <circle cx="145" cy="25" r="5" fill="#10b981" />
          <text x="235" y="55" className={labelStyle}>6</text>
          <path d="M90,50 H125" stroke="#1e293b" strokeWidth="2" strokeDasharray="3 3" />
        </g>
      </svg>

      <div className="absolute top-10 left-10 space-y-3">
        <div className="flex flex-col border-l-4 border-blue-500 bg-slate-900/90 p-4 rounded-xl shadow-xl backdrop-blur-md">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">B-Flux Intensity</span>
          <span className="text-white text-2xl font-black">{(power * frequency / 1000).toFixed(1)} <span className="text-blue-500 text-sm">Φ</span></span>
        </div>
        <div className="flex flex-col border-l-4 border-orange-500 bg-slate-900/90 p-4 rounded-xl shadow-xl backdrop-blur-md">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Skin Depth (δ)</span>
          <span className="text-orange-400 text-2xl font-black">{(0.45 / Math.sqrt(frequency/20)).toFixed(3)} <span className="text-slate-500 text-sm font-normal">мм</span></span>
        </div>
      </div>
    </div>
  );
};