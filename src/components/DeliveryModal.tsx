
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
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 backdrop-blur-2xl">
      <div className="bg-[#12141a] rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] max-w-7xl w-full max-h-[95vh] overflow-hidden border border-white/10 flex flex-col">
        {/* Header - Royal Blue Style */}
        <div className="bg-[#2563eb] p-8 flex items-center justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-4 text-white">
              <CalendarIcon className="w-10 h-10" />
              <h2 className="text-4xl font-black tracking-tight">
                Entregas do dia {date.toLocaleDateString('pt-BR')}
              </h2>
            </div>
            <p className="text-blue-100/80 text-xl font-bold mt-2 ml-14 tracking-wide">
              {events.length} {events.length === 1 ? 'entrega programada' : 'entregas programadas'} •
              Total: <span className="text-white font-black">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-white/20 rounded-2xl transition-all text-white border border-transparent hover:border-white/30"
          >
            <X className="w-10 h-10" />
          </button>
        </div>

        {/* Content - Detailed Cards */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-[#0a0c10]/50">
          <div className="flex flex-col gap-6">
            {events.map((event, index) => (
              <div
                key={`${event.id}-${index}`}
                className="bg-[#1c2128] rounded-[1.5rem] p-8 border border-white/5 transition-all hover:bg-[#222831]"
                style={{ borderLeft: `8px solid ${event.color}` }}
              >
                {/* Card Title Line */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-5 h-5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <Package className="w-8 h-8 text-white/40" />
                  <h3 className="text-3xl font-black text-white italic tracking-tighter">
                    Pedido #{event.numeroPedido}
                  </h3>
                </div>

                {/* Info Grid - 4 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Row 1: Cliente and Valor */}
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center gap-5">
                    <div className="bg-[#2563eb]/20 p-3 rounded-xl border border-[#2563eb]/30">
                      <Building className="w-6 h-6 text-[#2563eb]" />
                    </div>
                    <div>
                      <span className="text-white/30 text-xs font-black uppercase tracking-widest block mb-1">Cliente</span>
                      <span className="text-xl font-black text-white leading-tight uppercase line-clamp-1">{event.cliente}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center gap-5">
                    <div className="bg-[#10b981]/20 p-3 rounded-xl border border-[#10b981]/30">
                      <DollarSign className="w-6 h-6 text-[#10b981]" />
                    </div>
                    <div>
                      <span className="text-white/30 text-xs font-black uppercase tracking-widest block mb-1">Valor Total</span>
                      <span className="text-3xl font-black text-[#10b981] italic">{event.valor}</span>
                    </div>
                  </div>

                  {/* Row 2: Data and Status */}
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center gap-5">
                    <div className="bg-[#f59e0b]/20 p-3 rounded-xl border border-[#f59e0b]/30">
                      <CalendarIcon className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <div>
                      <span className="text-white/30 text-xs font-black uppercase tracking-widest block mb-1">Data de Entrega</span>
                      <span className="text-xl font-black text-white">{date.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 flex items-center gap-5">
                    <div className="bg-[#8b5cf6]/20 p-3 rounded-xl border border-[#8b5cf6]/30">
                      <Package className="w-6 h-6 text-[#8b5cf6]" />
                    </div>
                    <div>
                      <span className="text-white/30 text-xs font-black uppercase tracking-widest block mb-1">Status</span>
                      <span className="text-xl font-black text-white uppercase tracking-tighter italic">Programada</span>
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
