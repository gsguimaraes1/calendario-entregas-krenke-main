
import React from 'react';
import { CalendarEvent } from '../types/delivery';

interface CalendarEventProps {
  event: CalendarEvent;
  onHover?: (event: CalendarEvent | null) => void;
}

const CalendarEventComponent: React.FC<CalendarEventProps> = ({ event, onHover }) => {
  return (
    <div
      className="group relative p-3 rounded-xl text-white cursor-pointer transition-all duration-300 border border-white/10 hover:border-white/20 active:scale-95 flex flex-col gap-1 overflow-hidden"
      style={{
        backgroundColor: `${event.color}33`, // 20% opacity
        borderLeft: `4px solid ${event.color}`
      }}
      onMouseEnter={() => onHover?.(event)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="font-black truncate text-base tracking-tight flex items-center gap-2">
        <span className="text-[#00AEEF]">#</span>{event.numeroPedido}
      </div>
      <div className="truncate text-sm font-bold opacity-80 uppercase tracking-tighter">
        {event.cliente}
      </div>
      <div className="text-sm font-black text-white/90">
        {event.valor}
      </div>
    </div>
  );
};

export default CalendarEventComponent;
