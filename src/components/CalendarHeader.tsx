
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Download, TrendingUp } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  onGoToToday: () => void;
  onLoadData: () => void;
  totalEvents: number;
  monthNames: string[];
  viewMode: 'day' | 'week' | 'month' | 'year';
  onViewModeChange: (mode: 'day' | 'week' | 'month' | 'year') => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onNavigate,
  onGoToToday,
  onLoadData,
  totalEvents,
  monthNames,
  viewMode,
  onViewModeChange
}) => {
  const getViewTitle = () => {
    if (viewMode === 'year') return currentDate.getFullYear().toString();
    if (viewMode === 'day') return `${currentDate.getDate()} de ${monthNames[currentDate.getMonth()].toUpperCase()} ${currentDate.getFullYear()}`;
    return `${monthNames[currentDate.getMonth()].toUpperCase()} ${currentDate.getFullYear()}`;
  };

  return (
    <div className="bg-[#0f1115] rounded-2xl shadow-2xl p-6 border border-white/10 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <img src="/logo_krenke.png" alt="Krenke" className="h-16 w-auto" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
            Monitor de Entregas
          </h1>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-gray-400 text-lg font-medium">Fluxo em tempo real • {totalEvents} entregas agendadas</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8">
        {/* View Mode Switcher */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          {(['day', 'week', 'month', 'year'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-widest transition-all ${viewMode === mode
                  ? 'bg-[#2563eb] text-white shadow-lg'
                  : 'text-white/40 hover:text-white/70'
                }`}
            >
              {mode === 'day' ? 'Dia' : mode === 'week' ? 'Semana' : mode === 'month' ? 'Mês' : 'Ano'}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('prev')}
            className="p-4 hover:bg-white/5 text-white/50 hover:text-white rounded-xl transition-all border border-transparent hover:border-white/10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <h2 className="text-5xl font-black text-white min-w-[500px] text-center tracking-tighter italic">
            {getViewTitle()}
          </h2>

          <button
            onClick={() => onNavigate('next')}
            className="p-4 hover:bg-white/5 text-white/50 hover:text-white rounded-xl transition-all border border-transparent hover:border-white/10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>

        <div className="h-16 w-[1px] bg-white/10"></div>

        <button
          onClick={onGoToToday}
          className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl transition-all font-bold text-lg border border-white/10 uppercase tracking-widest"
        >
          Hoje
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
