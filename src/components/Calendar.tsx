
import React, { useState, useEffect } from 'react';
import { fetchAndParseCSV, generateRandomColor, parseDate } from '../utils/csvParser';
import { CalendarEvent } from '../types/delivery';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarStats from './CalendarStats';
import DeliveryModal from './DeliveryModal';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [isRotated, setIsRotated] = useState(false);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  useEffect(() => {
    loadData();
    // Auto-refresh a cada 30 minutos
    const interval = setInterval(loadData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const csvData = await fetchAndParseCSV();

      const calendarEvents: CalendarEvent[] = csvData
        .map((row) => {
          const date = parseDate(row.DtEntrega);
          if (!date || isNaN(date.getTime())) return null;

          let valorFormatado = 'R$ 0,00';
          if (row.ValorTotal) {
            if (row.ValorTotal.includes('R$')) {
              valorFormatado = row.ValorTotal;
            } else {
              // Limpeza para suporte ao formato brasileiro (ponto para milhar, vírgula para decimal)
              const valorLimpo = row.ValorTotal.toString().replace(/[^\d,]/g, '');
              const valorNumerico = parseFloat(valorLimpo.replace(',', '.'));
              if (!isNaN(valorNumerico)) {
                valorFormatado = `R$ ${valorNumerico.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}`;
              }
            }
          }

          return {
            id: row.ID?.toString() || Math.random().toString(),
            numeroPedido: row.NumeroPedido?.toString() || 'N/A',
            title: `${row.NumeroPedido || 'N/A'} - ${row.DescCliente || 'Cliente'}`,
            date,
            cliente: row.DescCliente || 'Cliente não informado',
            valor: valorFormatado,
            color: generateRandomColor(),
          };
        })
        .filter((event): event is CalendarEvent => event !== null);

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
    setLoading(false);
  };

  const getDaysInView = (date: Date, mode: 'day' | 'week' | 'month' | 'year') => {
    const days = [];
    const today = new Date(date);
    today.setHours(0, 0, 0, 0);

    if (mode === 'day') {
      days.push({ date: new Date(today), isCurrentMonth: true });
    }
    else if (mode === 'week') {
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(startOfWeek);
        currentDay.setDate(startOfWeek.getDate() + i);
        days.push({ date: currentDay, isCurrentMonth: currentDay.getMonth() === today.getMonth() });
      }
    }
    else if (mode === 'month') {
      const year = today.getFullYear();
      const month = today.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({ date: new Date(year, month - 1, prevMonthLastDay - i), isCurrentMonth: false });
      }
      for (let day = 1; day <= lastDayOfMonth; day++) {
        days.push({ date: new Date(year, month, day), isCurrentMonth: true });
      }
      const remainingCells = 42 - days.length;
      for (let day = 1; day <= remainingCells; day++) {
        days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
      }
    }
    else if (mode === 'year') {
      // Para o modo ano, mostraremos os primeiros dias de cada mês ou algo similar, 
      // mas para manter a estrutura do grid, vamos mostrar os meses como "cards" (12 células)
      for (let m = 0; m < 12; m++) {
        days.push({ date: new Date(today.getFullYear(), m, 1), isCurrentMonth: true });
      }
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event =>
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleDateClick = (date: Date) => {
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length > 0) {
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      const step = direction === 'next' ? 1 : -1;

      if (viewMode === 'day') newDate.setDate(newDate.getDate() + step);
      else if (viewMode === 'week') newDate.setDate(newDate.getDate() + (step * 7));
      else if (viewMode === 'month') newDate.setMonth(newDate.getMonth() + step);
      else if (viewMode === 'year') newDate.setFullYear(newDate.getFullYear() + step);

      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setViewMode('week'); // Retorna ao estágio de semana conforme solicitado
  };

  if (loading && events.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-[#00AEEF] mx-auto mb-10"></div>
          <p className="text-white text-3xl font-bold tracking-tight">SINCRONIZANDO ENTREGAS KRENKE...</p>
          <p className="text-gray-400 text-lg mt-4 animate-pulse">Preparando visualização para o escritório</p>
        </div>
      </div>
    );
  }

  const days = getDaysInView(currentDate, viewMode);

  return (
    <div className={`fixed inset-0 bg-[#050505] overflow-hidden flex flex-col p-2 sm:p-4 md:p-6 gap-2 sm:gap-4 dark transition-all duration-500 ${isRotated ? 'force-landscape is-rotated' : ''}`}>
      <div className="flex-none">
        <CalendarHeader
          currentDate={currentDate}
          onNavigate={navigateMonth}
          onGoToToday={goToToday}
          onLoadData={loadData}
          totalEvents={events.length}
          monthNames={monthNames}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isRotated={isRotated}
          onToggleRotation={() => setIsRotated(!isRotated)}
        />
      </div>

      <div className="flex-1 min-h-0">
        <CalendarGrid
          days={days}
          events={events}
          weekDays={weekDays}
          onDateClick={handleDateClick}
          onHoverEvent={setHoveredEvent}
          viewMode={viewMode}
        />
      </div>

      <div className="flex-none">
        <CalendarStats
          events={events}
          currentDate={currentDate}
          viewMode={viewMode}
        />
      </div>

      <DeliveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate}
        events={selectedDate ? getEventsForDate(selectedDate) : []}
      />
    </div>
  );
};

export default Calendar;
