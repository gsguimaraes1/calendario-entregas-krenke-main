
import React from 'react';
import { CalendarEvent } from '../types/delivery';
import CalendarEventComponent from './CalendarEvent';

interface CalendarDayProps {
  day: { date: Date; isCurrentMonth: boolean };
  dayEvents: CalendarEvent[];
  isToday: boolean;
  onDateClick: (date: Date) => void;
  onHoverEvent: (event: CalendarEvent | null) => void;
  viewMode: 'day' | 'week' | 'month' | 'year';
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  dayEvents,
  isToday,
  onDateClick,
  onHoverEvent,
  viewMode
}) => {
  const hasEvents = dayEvents.length > 0;
  const isDayView = viewMode === 'day';

  return (
    <div
      onClick={() => onDateClick(day.date)}
      className={`relative flex-1 p-1 sm:p-2 md:p-4 border-r border-white/5 last:border-r-0 transition-all duration-300 group overflow-y-auto custom-scrollbar ${day.isCurrentMonth ? 'bg-transparent' : 'bg-black/40 grayscale-[0.5] opacity-50'
        } ${isToday ? 'bg-[#2563eb]/10 ring-inset ring-1 sm:ring-2 ring-[#2563eb]/40' : ''} ${hasEvents && day.isCurrentMonth ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'
        }`}
    >
      {/* Visual Indicator for Today */}
      {isToday && (
        <div className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-[#2563eb] shadow-[0_0_20px_#2563eb] z-20"></div>
      )}

      <div className={`flex flex-col sm:flex-row items-center sm:items-start justify-between mb-1 sm:mb-3 md:mb-4 ${day.isCurrentMonth ? 'text-white' : 'text-white/40'
        }`}>
        <div className="flex flex-col items-center sm:items-start">
          <span className={`font-black italic tracking-tighter leading-none ${isDayView ? 'text-4xl sm:text-7xl md:text-8xl' : 'text-lg sm:text-2xl md:text-4xl'
            } ${isToday ? 'text-[#2563eb]' : ''}`}>
            {day.date.getDate().toString().padStart(2, '0')}
          </span>
          <span className={`font-black opacity-40 uppercase tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.4em] mt-0.5 sm:mt-1 md:mt-2 ${isDayView ? 'text-xs sm:text-lg md:text-2xl' : 'text-[6px] sm:text-[8px] md:text-[10px]'
            } truncate max-w-full`}>
            {day.date.toLocaleDateString('pt-BR', { month: 'short' })}
          </span>
        </div>

        {hasEvents && (
          <span className={`font-black bg-[#EC008C] text-white rounded sm:rounded-lg md:rounded-xl shadow-xl transform -rotate-3 ${isDayView ? 'px-3 py-1 sm:px-6 sm:py-3 md:px-8 md:py-4 text-xs sm:text-2xl md:text-3xl' : 'px-1 py-0.5 sm:px-2 sm:py-1 text-[6px] sm:text-[8px] md:text-xs'
            } whitespace-nowrap`}>
            {dayEvents.length} <span className="hidden sm:inline">{dayEvents.length === 1 ? 'PEDIDO' : 'PEDIDOS'}</span>
          </span>
        )}
      </div>

      <div className={`space-y-4 ${isDayView ? 'grid grid-cols-2 gap-4 space-y-0' : 'flex flex-col'
        } ${!day.isCurrentMonth ? 'opacity-40 pointer-events-none' : ''}`}>
        {dayEvents.map(event => (
          <CalendarEventComponent
            key={event.id}
            event={event}
            onHover={day.isCurrentMonth ? onHoverEvent : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
