
import React from 'react';
import { TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { CalendarEvent } from '../types/delivery';

interface CalendarStatsProps {
  events: CalendarEvent[];
  currentDate: Date;
  viewMode: 'day' | 'week' | 'month' | 'year';
}

const CalendarStats: React.FC<CalendarStatsProps> = ({ events, currentDate, viewMode }) => {
  const today = new Date();

  // Filtra eventos para o período visível
  const visibleEvents = events.filter(e => {
    if (viewMode === 'day') return e.date.toDateString() === currentDate.toDateString();
    if (viewMode === 'year') return e.date.getFullYear() === currentDate.getFullYear();
    if (viewMode === 'month') return e.date.getMonth() === currentDate.getMonth() && e.date.getFullYear() === currentDate.getFullYear();
    // Para semana, uma simplificação (ou manter total):
    return true;
  });

  const todayEventsCount = events.filter(e => e.date.toDateString() === today.toDateString()).length;
  const futureEventsCount = events.filter(e => e.date > today).length;

  return (
    <div className="bg-[#0f1115] border border-white/10 rounded-xl px-2 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-4 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-6 mobile-row-to-row">
        <div className="bg-white/5 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all flex-1 min-w-0">
          <div className="truncate">
            <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs font-black tracking-widest uppercase mb-0.5 truncate">Total</div>
            <div className="text-lg sm:text-2xl md:text-4xl font-black text-white italic tracking-tighter leading-none">
              {visibleEvents.length.toString().padStart(2, '0')}
            </div>
          </div>
          <TrendingUp className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#00AEEF] opacity-20 group-hover:opacity-40 transition-opacity hidden xs:block" />
        </div>

        <div className="bg-white/5 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all flex-1 min-w-0">
          <div className="truncate">
            <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs font-black tracking-widest uppercase mb-0.5 truncate">Hoje</div>
            <div className="text-lg sm:text-2xl md:text-4xl font-black text-[#EC008C] italic tracking-tighter leading-none">
              {todayEventsCount.toString().padStart(2, '0')}
            </div>
          </div>
          <Clock className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#EC008C] opacity-20 group-hover:opacity-40 transition-opacity hidden xs:block" />
        </div>

        <div className="bg-white/5 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all border-l-2 border-l-[#F7941D] flex-1 min-w-0">
          <div className="truncate">
            <div className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs font-black tracking-widest uppercase mb-0.5 truncate">Agenda</div>
            <div className="text-lg sm:text-2xl md:text-4xl font-black text-[#F7941D] italic tracking-tighter leading-none">
              {futureEventsCount.toString().padStart(2, '0')}
            </div>
          </div>
          <CheckCircle className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#F7941D] opacity-20 group-hover:opacity-40 transition-opacity hidden xs:block" />
        </div>
      </div>
    </div>
  );
};

export default CalendarStats;
