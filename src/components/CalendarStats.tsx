
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
    <div className="bg-[#0f1115] border border-white/10 rounded-2xl p-6 shadow-2xl">
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
          <div>
            <div className="text-gray-400 text-sm font-black tracking-widest uppercase mb-1">Total Período</div>
            <div className="text-6xl font-black text-white italic tracking-tighter">
              {visibleEvents.length.toString().padStart(2, '0')}
            </div>
          </div>
          <TrendingUp className="w-16 h-16 text-[#00AEEF] opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all">
          <div>
            <div className="text-gray-400 text-sm font-black tracking-widest uppercase mb-1">Hoje</div>
            <div className="text-6xl font-black text-[#EC008C] italic tracking-tighter">
              {todayEventsCount.toString().padStart(2, '0')}
            </div>
          </div>
          <Clock className="w-16 h-16 text-[#EC008C] opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/10 transition-all border-l-4 border-l-[#F7941D]">
          <div>
            <div className="text-gray-400 text-sm font-black tracking-widest uppercase mb-1">Agendadas</div>
            <div className="text-6xl font-black text-[#F7941D] italic tracking-tighter">
              {futureEventsCount.toString().padStart(2, '0')}
            </div>
          </div>
          <CheckCircle className="w-16 h-16 text-[#F7941D] opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>
      </div>
    </div>
  );
};

export default CalendarStats;
