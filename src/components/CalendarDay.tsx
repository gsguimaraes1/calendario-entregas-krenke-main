
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
      className={`relative flex-1 p-8 border-r border-white/5 last:border-r-0 transition-all duration-300 group overflow-y-auto custom-scrollbar ${day.isCurrentMonth ? 'bg-transparent' : 'bg-black/40 grayscale-[0.5] opacity-50'
        } ${isToday ? 'bg-[#2563eb]/10 ring-inset ring-2 ring-[#2563eb]/40' : ''} ${hasEvents && day.isCurrentMonth ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'
        }`}
    >
      {/* Visual Indicator for Today */}
      {isToday && (
        <div className="absolute inset-x-0 top-0 h-2 bg-[#2563eb] shadow-[0_0_30px_#2563eb] z-20"></div>
      )}

      <div className={`flex items-start justify-between mb-8 ${day.isCurrentMonth ? 'text-white' : 'text-white/40'
        }`}>
        <div className="flex flex-col">
          <span className={`font-black italic tracking-tighter leading-none ${isDayView ? 'text-9xl' : 'text-6xl'
            } ${isToday ? 'text-[#2563eb]' : ''}`}>
            {day.date.getDate().toString().padStart(2, '0')}
          </span>
          <span className={`font-black opacity-40 uppercase tracking-[0.4em] mt-4 ${isDayView ? 'text-2xl' : 'text-xs'
            }`}>
            {day.date.toLocaleDateString('pt-BR', { month: 'long' })}
          </span>
        </div>

        {hasEvents && (
          <span className={`font-black bg-[#EC008C] text-white rounded-2xl shadow-xl transform -rotate-3 ${isDayView ? 'px-8 py-4 text-3xl' : 'px-4 py-2 text-sm'
            }`}>
            {dayEvents.length} {dayEvents.length === 1 ? 'PEDIDO' : 'PEDIDOS'}
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
