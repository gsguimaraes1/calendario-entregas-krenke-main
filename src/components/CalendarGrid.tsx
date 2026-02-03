
import React from 'react';
import { CalendarEvent } from '../types/delivery';
import CalendarDay from './CalendarDay';

interface CalendarGridProps {
  days: { date: Date; isCurrentMonth: boolean }[];
  events: CalendarEvent[];
  weekDays: string[];
  onDateClick: (date: Date) => void;
  onHoverEvent: (event: CalendarEvent | null) => void;
  viewMode: 'day' | 'week' | 'month' | 'year';
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  events,
  weekDays,
  onDateClick,
  onHoverEvent,
  viewMode
}) => {
  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.toDateString() === date.toDateString()
    );
  };

  const today = new Date();

  return (
    <div className="h-full bg-[#0a0c10] rounded-xl shadow-xl overflow-hidden border border-white/10 flex flex-col">
      {/* Header Condicional */}
      {viewMode !== 'year' && viewMode !== 'day' && (
        <div className="grid grid-cols-7 bg-[#161b22] border-b border-white/10 flex-none shadow-xl z-30">
          {weekDays.map(day => (
            <div key={day} className="py-2 sm:py-3 md:py-4 text-center font-black text-white/40 text-[10px] sm:text-lg md:text-xl tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase border-r border-white/5 last:border-r-0 italic">
              {day}
            </div>
          ))}
        </div>
      )}

      {/* Grid Dinâmico */}
      <div className={`grid flex-1 divide-x divide-white/5 bg-gradient-to-b from-transparent to-white/[0.02] min-h-0 ${viewMode === 'day' ? 'grid-cols-1' :
        viewMode === 'year' ? 'grid-cols-2 md:grid-cols-4 grid-rows-none md:grid-rows-3' :
          'grid-cols-7'
        }`}>
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day.date);
          const isToday = day.date.toDateString() === today.toDateString();

          if (viewMode === 'year') {
            return (
              <div
                key={index}
                onClick={() => onDateClick(day.date)}
                className="p-4 md:p-6 border-r border-b border-white/5 flex flex-col items-center justify-center hover:bg-white/5 transition-all cursor-pointer group"
              >
                <span className="text-white/20 text-[8px] md:text-xs font-black uppercase tracking-[0.4em] mb-1 group-hover:text-[#2563eb] transition-colors">Mês</span>
                <span className="text-xl md:text-3xl font-black text-white italic tracking-tighter uppercase whitespace-nowrap">
                  {day.date.toLocaleDateString('pt-BR', { month: 'long' })}
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#EC008C]"></div>
                  <span className="text-[#EC008C] font-black text-xs md:text-lg">
                    {events.filter(e => e.date.getMonth() === day.date.getMonth() && e.date.getFullYear() === day.date.getFullYear()).length} EQ
                  </span>
                </div>
              </div>
            );
          }

          return (
            <CalendarDay
              key={index}
              day={day}
              dayEvents={dayEvents}
              isToday={isToday}
              onDateClick={onDateClick}
              onHoverEvent={onHoverEvent}
              viewMode={viewMode}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
