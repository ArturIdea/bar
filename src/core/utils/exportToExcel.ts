import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const MAX_SHEET_NAME_LENGTH = 31;

export function exportToExcel(data: any[], fileName: string = 'export') {
  if (!data || data.length === 0) {
    console.warn('No data available to export.');
    return;
  }

  let sheetName = fileName;
  if (sheetName.length > MAX_SHEET_NAME_LENGTH) {
    sheetName = sheetName.slice(0, MAX_SHEET_NAME_LENGTH);
  }
  
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(dataBlob, `${fileName}_${Date.now()}.xlsx`);
}
