
export async function fetchAndParseCSV(): Promise<any[]> {
  try {
    // URL corrigida para CSV do Google Sheets
    // Substitua SHEET_ID e GID pelos valores corretos da sua planilha
    const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vTJkKiHmAsGjIZ3H--iDiLGCexaIg5-IrtkdXQAEBt4NSqG1c4UnmjH6_PlWDRS6A/pub?output=csv");
    
    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText);
      return [];
    }
    
    const text = await response.text();
    console.log('Texto CSV recebido (primeiros 500 caracteres):', text.substring(0, 500));
    
    // Verificar se recebemos HTML em vez de CSV
    if (text.includes('<!DOCTYPE html>')) {
      console.error('Recebido HTML em vez de CSV. Verifique a URL da planilha.');
      console.error('Certifique-se de que a planilha está configurada como pública.');
      return [];
    }
    
    const rows = text.split('\n').filter(row => row.trim());
    
    if (rows.length === 0) {
      console.error('Nenhuma linha encontrada no CSV');
      return [];
    }
    
    // Parse do cabeçalho
    const headers = parseCSVRow(rows[0]);
    console.log('Headers encontrados:', headers);
    
    const dataRows = rows.slice(1);
    console.log('Total de linhas de dados:', dataRows.length);
    
    return dataRows.map((row, index) => {
      const cols = parseCSVRow(row);
      const rowData: any = {};
      
      headers.forEach((header, colIndex) => {
        rowData[header] = cols[colIndex] || '';
      });
      
      // Log dos primeiros registros para debug
      if (index < 3) {
        console.log(`Registro ${index + 1}:`, rowData);
      }
      
      return rowData;
    }).filter(row => row.DtEntrega && row.DtEntrega !== '');
  } catch (error) {
    console.error('Erro ao buscar dados do CSV:', error);
    return [];
  }
}

// Função para fazer parse de uma linha CSV considerando aspas
function parseCSVRow(row: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < row.length) {
    const char = row[i];
    const nextChar = row[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Aspas duplas escapadas
        current += '"';
        i += 2;
        continue;
      } else {
        // Início ou fim de aspas
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Separador de campo
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
    
    i++;
  }
  
  // Adicionar o último campo
  result.push(current.trim());
  
  return result;
}

export function generateRandomColor(): string {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
    '#14B8A6', '#F43F5E', '#8B5A2B', '#059669', '#DC2626'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function parseDate(dateString: string): Date | null {
  if (!dateString) return null;
  
  console.log('Parseando data:', dateString);
  
  // Remover tempo se presente (ex: "18/07/2025 00:00:00" -> "18/07/2025")
  const cleanDateString = dateString.split(' ')[0];
  
  // Tentar diferentes formatos de data
  const formats = [
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/,  // DD/MM/YYYY
    /(\d{4})-(\d{1,2})-(\d{1,2})/,    // YYYY-MM-DD
  ];
  
  for (const format of formats) {
    const match = cleanDateString.match(format);
    if (match) {
      if (format === formats[0]) {
        // DD/MM/YYYY
        const [, day, month, year] = match;
        const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        console.log('Data parseada:', parsedDate);
        return parsedDate;
      } else {
        // YYYY-MM-DD
        const [, year, month, day] = match;
        const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        console.log('Data parseada:', parsedDate);
        return parsedDate;
      }
    }
  }
  
  console.warn('Não foi possível parsear a data:', dateString);
  return null;
}

export function parseValor(valorString: string): number {
  if (!valorString || valorString.trim() === '') return 0;
  
  console.log('Parseando valor:', valorString);
  
  // Remove caracteres não numéricos exceto ponto e vírgula
  const cleanValue = valorString.replace(/[^\d.,]/g, '');
  
  // Se está vazio após limpeza, retorna 0
  if (!cleanValue) return 0;
  
  // Substitui vírgula por ponto para parsing (formato brasileiro)
  const normalizedValue = cleanValue.replace(',', '.');
  
  const parsed = parseFloat(normalizedValue);
  const result = isNaN(parsed) ? 0 : parsed;
  
  console.log('Valor parseado:', result);
  return result;
}
