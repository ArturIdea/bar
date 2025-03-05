import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export function exportToExcel(data: any[], fileName: string = 'export') {
  if (!data || data.length === 0) {
    console.warn('No data available to export.');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(dataBlob, `${fileName}_${Date.now()}.xlsx`);
}
