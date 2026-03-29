import React from 'react';

const FinancialHealth = ({ income, expense }) => {
  const ratio = income > 0 ? (expense / income) * 100 : 0;
  const score = Math.max(0, Math.min(100, 100 - ratio)).toFixed(0);
  
  let status = { 
    text: "Excellent", 
    color: "#10b981", 
    textColor: "text-emerald-400", 
    tip: "You are saving more than you spend. Your financial discipline is top-notch!" 
  };
  
  if (ratio > 50 && ratio <= 80) {
    status = { 
      text: "Good", 
      color: "#3b82f6", 
      textColor: "text-blue-400", 
      tip: "You're in a safe zone. Aim to keep non-essential expenses under 30%." 
    };
  } else if (ratio > 80 && ratio < 100) {
    status = { 
      text: "Warning", 
      color: "#f59e0b", 
      textColor: "text-yellow-400", 
      tip: "Your spending is very close to your earnings. Look for small leaks in your budget." 
    };
  } else if (ratio >= 100) {
    status = { 
      text: "Critical", 
      color: "#ef4444", 
      textColor: "text-red-400", 
      tip: "You are spending more than you earn. Consider reviewing your fixed costs immediately." 
    };
  }

  const circumference = 314;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="mt-10 bg-gradient-to-br from-gray-800/50 to-[#1e293b] p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:border-blue-500/30">
      
      {/* Text Content */}
      <div className="text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-3 mb-3">
           <h3 className="text-2xl font-bold text-white tracking-tight">Financial Health</h3>
           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-black/40 ${status.textColor} border border-white/5`}>
             {status.text}
           </span>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
          {status.tip}
        </p>
      </div>
      
      {/* Circle Container */}
      <div className="relative flex items-center justify-center shrink-0">
        {/* SVG is rotated so the stroke starts at the top (12 o'clock) */}
        <svg className="w-40 h-40 transform -rotate-90">
          <circle 
            className="text-gray-700/50" 
            strokeWidth="12" 
            stroke="currentColor" 
            fill="transparent" 
            r="50" cx="80" cy="80" 
          />
          <circle 
            strokeWidth="12" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round" 
            stroke={status.color}
            fill="transparent" 
            r="50" cx="80" cy="80" 
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Centered Percentage Text - Removed 'rotate-90' to keep it straight */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-white">{score}%</span>
          <span className="text-[10px] uppercase text-gray-500 font-bold tracking-[0.2em] -mt-1">Score</span>
        </div>
      </div>

    </div>
  );
};

export default FinancialHealth;