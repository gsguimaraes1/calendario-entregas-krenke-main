
import React from 'react';
import { X, Package, Building, DollarSign, Calendar as CalendarIcon } from 'lucide-react';
import { CalendarEvent } from '../types/delivery';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  events: CalendarEvent[];
}

const DeliveryModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose, date, events }) => {
  if (!isOpen || !date) return null;

  const totalValue = events.reduce((sum, event) => {
    // Remove tudo que não é dígito ou vírgula (removendo pontos de milhar do formato PT-BR)
    const cleanValue = event.valor.replace(/[^\d,]/g, '').replace(',', '.');
    const numValue = parseFloat(cleanValue);
    return sum + (isNaN(numValue) ? 0 : numValue);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-2 sm:p-4 md:p-6 backdrop-blur-2xl">
      <div className="bg-[#12141a] rounded-xl sm:rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] max-w-7xl w-full max-h-[98vh] overflow-hidden border border-white/10 flex flex-col">
        {/* Header - Royal Blue Style */}
        <div className="bg-[#2563eb] p-4 sm:p-6 md:p-8 flex items-center justify-between shadow-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-4 text-white">
              <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight leading-tight">
                Entregas do dia {date.toLocaleDateString('pt-BR')}
              </h2>
            </div>
            <p className="text-blue-100/90 text-[10px] sm:text-sm md:text-xl font-bold mt-1 sm:mt-2 ml-8 sm:ml-12 md:ml-14 tracking-wide">
              {events.length} {events.length === 1 ? 'entrega' : 'entregas'} •
              Total: <span className="text-white font-black text-xs sm:text-sm md:text-2xl inline-block ml-1">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-3 hover:bg-white/20 rounded-lg sm:rounded-2xl transition-all text-white border border-transparent hover:border-white/30 ml-2"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </button>
        </div>

        {/* Content - Detailed Cards */}
        <div className="p-3 sm:p-6 md:p-8 overflow-y-auto custom-scrollbar bg-[#0a0c10]/50">
          <div className="flex flex-col gap-3 sm:gap-6">
            {events.map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                className="bg-[#1c2128] rounded-xl sm:rounded-[1.5rem] p-4 sm:p-6 md:p-8 border border-white/5 transition-all hover:bg-[#222831]"
                style={{ borderLeft: `4px sm:border-l-8 solid ${event.color}` }}
              >
                {/* Card Title Line */}
                <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
                  <div
                    className="w-3 h-3 sm:w-5 sm:h-5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <Package className="w-5 h-5 sm:w-8 sm:h-8 text-white/40" />
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white italic tracking-tighter">
                    Pedido #{event.numeroPedido}
                  </h3>
                </div>

                {/* Info Grid - Responsive Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-4">
                  {/* Row 1: Cliente and Valor */}
                  <div className="bg-white/5 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/5 flex items-center gap-3 sm:gap-5">
                    <div className="bg-[#2563eb]/20 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#2563eb]/30 shrink-0">
                      <Building className="w-4 h-4 sm:w-6 sm:h-6 text-[#2563eb]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-white/30 text-[8px] sm:text-xs font-black uppercase tracking-widest block mb-0.5 sm:mb-1">Cliente</span>
                      <span className="text-sm sm:text-xl font-black text-white leading-tight uppercase truncate block">{event.cliente}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/5 flex items-center gap-3 sm:gap-5">
                    <div className="bg-[#10b981]/20 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#10b981]/30 shrink-0">
                      <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-[#10b981]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-white/30 text-[8px] sm:text-xs font-black uppercase tracking-widest block mb-0.5 sm:mb-1">Valor Total</span>
                      <span className="text-base sm:text-2xl md:text-3xl font-black text-[#10b981] italic truncate block">{event.valor}</span>
                    </div>
                  </div>

                  {/* Row 2: Data and Status */}
                  <div className="bg-white/5 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/5 flex items-center gap-3 sm:gap-5">
                    <div className="bg-[#f59e0b]/20 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#f59e0b]/30 shrink-0">
                      <CalendarIcon className="w-4 h-4 sm:w-6 sm:h-6 text-[#f59e0b]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-white/30 text-[8px] sm:text-xs font-black uppercase tracking-widest block mb-0.5 sm:mb-1">Data</span>
                      <span className="text-sm sm:text-xl font-black text-white truncate block">{date.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-white/5 flex items-center gap-3 sm:gap-5">
                    <div className="bg-[#8b5cf6]/20 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#8b5cf6]/30 shrink-0">
                      <Package className="w-4 h-4 sm:w-6 sm:h-6 text-[#8b5cf6]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-white/30 text-[8px] sm:text-xs font-black uppercase tracking-widest block mb-0.5 sm:mb-1">Status</span>
                      <span className="text-sm sm:text-xl font-black text-white uppercase tracking-tighter italic truncate block">Programada</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;
