
import React from 'react';
import { CalendarEvent } from '../types/delivery';

interface CalendarEventProps {
  event: CalendarEvent;
  onHover?: (event: CalendarEvent | null) => void;
}

const CalendarEventComponent: React.FC<CalendarEventProps> = ({ event, onHover }) => {
  return (
    <div
      className="group relative p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl text-white cursor-pointer transition-all duration-300 border border-white/10 hover:border-white/20 active:scale-95 flex flex-col gap-0.5 sm:gap-1 overflow-hidden"
      style={{
        backgroundColor: `${event.color}33`, // 20% opacity
        borderLeft: `4px solid ${event.color}`
      }}
      onMouseEnter={() => onHover?.(event)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="font-black truncate text-[10px] sm:text-xs md:text-base tracking-tight flex items-center gap-1 sm:gap-2">
        <span className="text-[#00AEEF]">#</span>{event.numeroPedido}
      </div>
      <div className="truncate text-[8px] sm:text-[10px] md:text-sm font-bold opacity-80 uppercase tracking-tighter">
        {event.cliente}
      </div>
      <div className="text-[10px] sm:text-[10px] md:text-sm font-black text-white/90">
        {event.valor}
      </div>
    </div>
  );
};

export default CalendarEventComponent;
