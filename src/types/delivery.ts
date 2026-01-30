
export interface DeliveryData {
  id: string;
  numeroPedido: string;
  descCliente: string;
  valorTotal: string;
  dtEntrega: string;
  color?: string;
}

export interface CalendarEvent {
  id: string;
  numeroPedido: string;
  title: string;
  date: Date;
  cliente: string;
  valor: string;
  color: string;
}
