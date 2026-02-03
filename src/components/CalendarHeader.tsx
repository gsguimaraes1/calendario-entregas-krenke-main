
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Download, TrendingUp, RotateCw } from 'lucide-react';

interface CalendarHeaderProps {
  currentDate: Date;
  onNavigate: (direction: 'prev' | 'next') => void;
  onGoToToday: () => void;
  onLoadData: () => void;
  totalEvents: number;
  monthNames: string[];
  viewMode: 'day' | 'week' | 'month' | 'year';
  onViewModeChange: (mode: 'day' | 'week' | 'month' | 'year') => void;
  isRotated: boolean;
  onToggleRotation: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onNavigate,
  onGoToToday,
  onLoadData,
  totalEvents,
  monthNames,
  viewMode,
  onViewModeChange,
  isRotated,
  onToggleRotation
}) => {
  const getViewTitle = () => {
    if (viewMode === 'year') return currentDate.getFullYear().toString();
    if (viewMode === 'day') return `${currentDate.getDate()} de ${monthNames[currentDate.getMonth()].toUpperCase()} ${currentDate.getFullYear()}`;
    return `${monthNames[currentDate.getMonth()].toUpperCase()} ${currentDate.getFullYear()}`;
  };

  return (
    <div className={`bg-[#0f1115] rounded-xl shadow-xl px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-2 sm:gap-3 mobile-row-to-row`}>
      <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 shrink-0">
        <div className="bg-white/5 p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl border border-white/10 shrink-0">
          <img src="/logo_krenke.png" alt="Krenke" className="h-4 sm:h-6 md:h-8 w-auto" />
        </div>
        <div>
          <h1 className="text-sm sm:text-lg md:text-xl font-black text-white tracking-tighter uppercase italic leading-none">
            Monitor de Entregas
          </h1>
          <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
            <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs font-medium uppercase tracking-wider">Fluxo Real • {totalEvents} Agendadas</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-6 w-full lg:w-auto justify-between lg:justify-end">
        {/* View Mode Switcher - Sleek Modern Style */}
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {(['day', 'week', 'month', 'year'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`flex-1 sm:flex-none px-3 md:px-4 py-1 rounded-md font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap relative overflow-hidden group/btn ${viewMode === mode
                ? 'bg-[#2563eb] text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] ring-1 ring-white/20'
                : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                }`}
            >
              <span className="relative z-10">{mode === 'day' ? 'Dia' : mode === 'week' ? 'Semana' : mode === 'month' ? 'Mês' : 'Ano'}</span>
              {viewMode === mode && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent animate-pulse pointer-events-none"></div>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-4 md:space-x-6">
          <button
            onClick={() => onNavigate('prev')}
            className="p-1 sm:p-2 hover:bg-white/5 text-white/40 hover:text-white rounded-lg transition-all border border-transparent hover:border-white/10"
          >
            <ChevronLeft className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          <h2 className="text-xs sm:text-lg md:text-xl lg:text-2xl font-black text-white min-w-[80px] sm:min-w-[150px] md:min-w-[300px] text-center tracking-tighter italic uppercase truncate">
            {getViewTitle()}
          </h2>

          <button
            onClick={() => onNavigate('next')}
            className="p-1 sm:p-2 hover:bg-white/5 text-white/40 hover:text-white rounded-lg transition-all border border-transparent hover:border-white/10"
          >
            <ChevronRight className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="hidden lg:block h-8 w-[1px] bg-white/10"></div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleRotation}
            className={`p-2 md:p-2 rounded-lg transition-all border border-white/10 flex items-center gap-2 active:scale-95 ${isRotated ? 'bg-[#2563eb] text-white' : 'bg-white/5 text-white/60 hover:text-white'
              }`}
            title="Rotacionar Dashboard"
          >
            <RotateCw className={`w-4 h-4 md:w-5 md:h-5 ${isRotated ? '-rotate-90' : ''} transition-transform`} />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest hidden sm:inline">Girar</span>
          </button>

          <button
            onClick={onGoToToday}
            className="bg-white/5 hover:bg-white/10 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg transition-all font-bold text-[10px] md:text-xs border border-white/10 uppercase tracking-widest active:scale-95"
          >
            Hoje
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
