import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MIN_POWER, MAX_POWER, MIN_FREQ, MAX_FREQ } from '../constants.ts';

const RHO = 0.7e-6;             
const MU0 = 4 * Math.PI * 1e-7; 
const MUR = 600;                

const W = 500;
const H = 640; 
const CX = W / 2;
const POT_W = 320;
const GLASS_Y = 280;
const COIL_Y = 360;

export const InductionSimulation: React.FC<{power: number, frequency: number}> = ({ power, frequency }) => {
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const loop = (now: number) => {
      setTick(now / 1000);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pf = (power - MIN_POWER) / (MAX_POWER - MIN_POWER);
  const ff = (frequency - MIN_FREQ) / (MAX_FREQ - MIN_FREQ);
  
  const omega = 2 * Math.PI * frequency * 1e3; 

  const delta_m = Math.sqrt((2 * RHO) / (omega * MU0 * MUR)); 
  const skinDepth_mm = delta_m * 1e3;
  const skinPx = Math.max(3, skinDepth_mm * 30); 

  const iNorm = Math.sin(tick * (ff * 12 + 8)); 
  const iSign = Math.sign(iNorm);
  const iAbs  = Math.abs(iNorm);

  const labelStyle = "text-[22px] font-black fill-white drop-shadow-[0_0_10px_rgba(59,130,246,1)] pointer-events-none";

  const fieldLines = [0.65, 1.0, 1.4].map((scale, idx) => {
    const hw = 140 * scale;
    const topY = 130;
    const botY = COIL_Y + 70;
    const pathR = `M ${CX + 40} ${COIL_Y} V ${topY} Q ${CX + hw} ${topY} ${CX + hw} ${(topY+botY)/2} Q ${CX + hw} ${botY} ${CX + 40} ${botY} V ${COIL_Y}`;
    const pathL = `M ${CX - 40} ${COIL_Y} V ${topY} Q ${CX - hw} ${topY} ${CX - hw} ${(topY+botY)/2} Q ${CX - hw} ${botY} ${CX - 40} ${botY} V ${COIL_Y}`;
    return { pathR, pathL, opacity: (0.15 + pf * 0.45) * iAbs };
  });

  return (
    <div className="simulation-view relative flex flex-col items-center justify-center bg-slate-950 rounded-[40px] border border-slate-800 overflow-hidden h-[680px] shadow-2xl">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:30px_30px]" />

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-w-[550px]">
        <defs>
          <filter id="glowHeat"><feGaussianBlur stdDeviation="8" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
          <filter id="glowEddy"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6" />
          </marker>
        </defs>

        {fieldLines.map((line, i) => (
          <g key={i} opacity={line.opacity}>
            <path d={line.pathR} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="12 15" strokeDashoffset={-tick * 400 * iSign} />
            <path d={line.pathL} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="12 15" strokeDashoffset={tick * 400 * iSign} />
          </g>
        ))}

        {[...Array(6)].map((_, i) => {
          const x = CX - 100 + i * 40;
          const yStart = iSign > 0 ? COIL_Y : GLASS_Y - 20;
          const yEnd = iSign > 0 ? GLASS_Y - 20 : COIL_Y;
          return (
            <path key={i} d={`M ${x} ${yStart} L ${x} ${yEnd}`} stroke="#3b82f6" strokeWidth="2.5" opacity={iAbs * 0.7} markerEnd="url(#arrow)" />
          );
        })}

        <g transform={`translate(${CX - POT_W/2}, 70)`}>
          <rect width={POT_W} height={180} rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          
          <g transform="translate(0, -5)">
            <path d={`M 5,10 Q ${POT_W/2},-60 ${POT_W-5},10`} fill="#334155" stroke="#64748b" strokeWidth="3" />
            <circle cx={POT_W/2} cy="-35" r="14" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <rect x={POT_W/2 - 5} y="-25" width="10" height="15" fill="#334155" />
          </g>

          <g transform="translate(0, 160)">
            <rect width={POT_W} height={5} fill="#94a3b8" /> 
            <rect y="5" width={POT_W} height={7} fill="#cbd5e1" /> 
            <rect y="12" width={POT_W} height={15} fill="#0f172a" rx="2" /> 

            <rect 
              x="2" y={27 - skinPx} width={POT_W-4} height={skinPx} 
              fill="#ef4444" filter="url(#glowHeat)"
              style={{ opacity: 0.2 + pf * 0.6 }}
            />

            <g transform="translate(0, 18)">
              {[-100, -50, 0, 50, 100].map((offsetX, i) => (
                <g key={i} transform={`translate(${POT_W/2 + offsetX}, 0)`}>
                   <motion.ellipse
                     rx="20" ry={6} fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8 6" filter="url(#glowEddy)"
                     animate={{ 
                       strokeDashoffset: i % 2 === 0 ? [0, 50] : [0, -50]
                     }}
                     transition={{ 
                       strokeDashoffset: { duration: 1 / (0.5 + ff * 2.5), repeat: Infinity, ease: "linear" }
                     }}
                     style={{ 
                       opacity: iAbs * (0.3 + pf * 0.7),
                       visibility: iAbs > 0.05 ? 'visible' : 'hidden' 
                     }}
                   />
                </g>
              ))}
            </g>

            <text x={POT_W + 10} y="4" fontSize="10" className="fill-slate-400 font-black">18/10</text>
            <text x={POT_W + 10} y="11" fontSize="10" className="fill-slate-500 font-black">Al</text>
            <text x={POT_W + 10} y="22" fontSize="10" className="fill-white font-black">430</text>
          </g>
        </g>
        <text x="15" y="100" className={labelStyle}>1</text>

        <rect x="25" y={GLASS_Y} width="450" height="12" fill="#475569" opacity="0.8" rx="2" />
        <text x="15" y={GLASS_Y + 10} className={labelStyle}>2</text>
        <rect x="25" y={GLASS_Y + 15} width="450" height="8" fill="#1e3a5f" opacity="0.9" rx="1" />
        <text x="15" y={GLASS_Y + 32} className={labelStyle}>3</text>

        <g transform={`translate(${CX - 150}, ${COIL_Y + 10})`}>
          {[...Array(10)].map((_, i) => {
            const isLeft = i < 5;
            const showCross = isLeft ? (iSign > 0) : (iSign < 0);
            return (
              <g key={i} transform={`translate(${i * 33.5}, 0)`}>
                <circle r="14" fill="none" stroke="#b45309" strokeWidth="2.5" />
                <g opacity={iAbs}>
                  {showCross ? (
                    <g><line x1="-5" y1="-5" x2="5" y2="5" stroke="#fbbf24" strokeWidth="2"/><line x1="5" y1="-5" x2="-5" y2="5" stroke="#fbbf24" strokeWidth="2"/></g>
                  ) : (
                    <circle r="4" fill="#fbbf24" />
                  )}
                </g>
              </g>
            );
          })}
        </g>
        <text x="15" y={COIL_Y + 25} className={labelStyle}>4</text>

        <g transform={`translate(${CX - 110}, ${H - 75})`}>
          <rect width="90" height="65" fill="#0f172a" stroke="#1e3a5f" strokeWidth="2" rx="10" />
          <text x="45" y="38" fill="#3b82f6" fontSize="14" textAnchor="middle" fontWeight="black" className="font-mono">{frequency} kHz</text>
          <text x="-40" y="38" className={labelStyle}>5</text>
        </g>

        <g transform={`translate(${CX + 20}, ${H - 75})`}>
          <rect width="90" height="65" fill="#0f172a" stroke="#1e3a5f" strokeWidth="2" rx="10" />
          <motion.circle cx="45" cy="32" r="8" fill={iSign > 0 ? "#10b981" : "#ef4444"} animate={{ opacity: [0.3, 1, 0.3] }} />
          <text x="130" y="38" className={labelStyle}>6</text>
        </g>
      </svg>

      <div className="absolute top-8 left-8 space-y-2">
        <div className="flex flex-col border-l-4 border-blue-500 bg-slate-900/95 px-4 py-1.5 rounded-r-xl backdrop-blur-md">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Магнитный поток</span>
          <span className="text-white text-lg font-black italic">{(iAbs * pf * 2.5).toFixed(2)} <span className="text-blue-500 text-xs">Вб</span></span>
        </div>
        <div className="flex flex-col border-l-4 border-purple-500 bg-slate-900/95 px-4 py-1.5 rounded-r-xl backdrop-blur-md">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Цикл. частота</span>
          <span className="text-purple-400 text-lg font-black">{(omega/1000).toFixed(0)} <span className="text-slate-500 text-xs font-normal">рад/с</span></span>
        </div>
        <div className="flex flex-col border-l-4 border-orange-500 bg-slate-900/95 px-4 py-1.5 rounded-r-xl backdrop-blur-md">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Скин-слой</span>
          <span className="text-orange-400 text-lg font-black">{skinDepth_mm.toFixed(3)} <span className="text-slate-500 text-xs font-normal">мм</span></span>
        </div>
      </div>
    </div>
  );
};